// backend/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import generateWorkerPDF from './generateWorkerPDF.js';
import {
  extractInitialDraft,
  updateDraftWithField,
  calculateTrustScore
} from './profileParser.js';
import { connectDB } from './db.js';
import i18nRouter from './routes/i18n.js';
import { CITY_MAP } from './cityMap.js';
import Sentiment from 'sentiment';  // [web:43]

const sentiment = new Sentiment();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', i18nRouter);

/* ------------------ FILE UPLOADS ------------------ */

app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'backend/backend/uploads'))
);

const uploadsDir = path.join(process.cwd(), 'backend/backend/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* ------------------ STORES ------------------ */

const workers = [];
const sessions = new Map();
let workersCollection = null;
let usersCollection = null;

/* ------------------ TRUST SCORE HELPERS ------------------ */

// Map text satisfaction -> numeric rating (1-5)
function mapSatisfactionToRating(text) {
  if (!text) return 3;
  const t = String(text).toLowerCase().trim();

  if (['excellent', 'very good', 'outstanding'].includes(t)) return 5;
  if (['good', 'nice'].includes(t)) return 4;
  if (['average', 'ok', 'okay', 'fine'].includes(t)) return 3;
  if (['poor', 'bad'].includes(t)) return 2;
  if (['very poor', 'terrible', 'worst'].includes(t)) return 1;

  return 3;
}

// Compute sentiment from free-text review (improvementSuggestions)
function computeSentimentScore(text) {
  if (!text || !text.trim()) return 0.5;
  const result = sentiment.analyze(text); // [web:43]
  const maxPossible = 10;
  let normalized = result.score / maxPossible;
  if (normalized > 1) normalized = 1;
  if (normalized < -1) normalized = -1;
  return (normalized + 1) / 2;
}

// Recompute Trust Score for a single worker document
async function recomputeWorkerTrust(workerId) {
  if (!workersCollection) return;

  const worker = await workersCollection.findOne({ _id: workerId });
  if (!worker) return;

  const feedbacks = worker.feedbacks || [];
  const n = feedbacks.length;

  if (n === 0) {
    await workersCollection.updateOne(
      { _id: workerId },
      {
        $set: {
          trustScore: 0,
          trustMeta: {
            avgRating: 0,
            sentimentScore01: 0.5,
            consistency: 0,
            experience: 0,
            activity: 0,
            reviewsCount: 0,
            rehireProbability: 0,
            cluster: 'average',
          },
        },
      }
    );
    return;
  }

  const ratings = feedbacks.map((f) => f.numericRating || 3);
  const sumRatings = ratings.reduce((s, r) => s + r, 0);
  const avgRating = sumRatings / n;

  const sentiments = feedbacks.map((f) =>
    typeof f.sentimentScore01 === 'number' ? f.sentimentScore01 : 0.5
  );
  const avgSentiment =
    sentiments.reduce((s, v) => s + v, 0) / sentiments.length;

  const mean = avgRating;
  const variance =
    ratings.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / n;
  const maxVar = 2;
  let consistency = 1 - variance / maxVar;
  if (consistency < 0) consistency = 0;
  if (consistency > 1) consistency = 1;

  const yearsExp = Number(worker.experienceYears || 0);
  const experience = Math.min(Math.max(yearsExp, 0), 10) / 10;

  const now = Date.now();
  const halfLifeDays = 90;
  const k =
    Math.log(2) / (halfLifeDays * 24 * 60 * 60 * 1000);
  let activitySum = 0;
  feedbacks.forEach((f) => {
    const ts = f.createdAt ? new Date(f.createdAt).getTime() : now;
    const ageMs = now - ts;
    const weight = Math.exp(-k * ageMs);
    activitySum += weight;
  });
  const activity = Math.min(activitySum / 10, 1);

  const trustScoreRaw =
    avgRating * 20 +
    avgSentiment * 30 +
    consistency * 20 +
    experience * 10 +
    activity * 20;

  const trustScore = Math.max(0, Math.min(trustScoreRaw, 100));

  const baseMeta = {
    avgRating,
    sentimentScore01: avgSentiment,
    consistency,
    experience,
    activity,
    reviewsCount: n,
  };

  const rehireProbability = computeRehireProbability(baseMeta);

  let trustCluster = 'average';
  if (trustScore >= 80 && rehireProbability >= 0.7) trustCluster = 'high';
  else if (trustScore <= 50 && rehireProbability <= 0.4) trustCluster = 'risky';

  const finalMeta = {
    ...baseMeta,
    rehireProbability,
    cluster: trustCluster,
  };

  await workersCollection.updateOne(
    { _id: workerId },
    {
      $set: {
        trustScore,
        trustMeta: finalMeta,
      },
    }
  );
}

// logistic + rehiring helpers
function logistic(x) {
  return 1 / (1 + Math.exp(-x));
}

function computeRehireProbability(meta) {
  const {
    avgRating,
    sentimentScore01,
    consistency,
    experience,
    activity,
  } = meta;

  const r = (avgRating - 1) / 4;

  const z =
    2.0 * r +
    1.5 * sentimentScore01 +
    1.0 * consistency +
    0.8 * experience +
    1.2 * activity -
    2.0;

  return logistic(z);
}

function createSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2);
}

/* ------------------ WORKER ONBOARDING ------------------ */

// 1️⃣ Start profile
app.post('/api/profile/start', (req, res) => {
  const { text } = req.body || {};
  const sessionId = createSessionId();

  const { draft, missingFields } = extractInitialDraft(text || '');
  sessions.set(sessionId, draft);

  res.json({ sessionId, draft, missingFields });
});

// 2️⃣ Answer field
app.post('/api/profile/answer', (req, res) => {
  const { sessionId, field, answerText } = req.body || {};

  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  const currentDraft = sessions.get(sessionId);
  const { draft, missingFields } = updateDraftWithField(
    currentDraft,
    field,
    answerText || ''
  );

  sessions.set(sessionId, draft);
  res.json({ sessionId, draft, missingFields });
});

// 3️⃣ Complete profile
function normalizeCity(raw) {
  if (!raw) return '';
  const cleaned = String(raw).toLowerCase().trim();
  const base = cleaned.split(',')[0];
  return CITY_MAP[cleaned] || CITY_MAP[base] || cleaned;
}

function buildSearchKeyEn(draft) {
  const parts = [];

  if (draft.name && /^[\x00-\x7F]+$/.test(draft.name)) {
    parts.push(String(draft.name));
  }

  if (draft.cityArea) parts.push(normalizeCity(draft.cityArea));
  if (draft.city) parts.push(normalizeCity(draft.city));

  if (draft.state && /^[\x00-\x7F]+$/.test(draft.state)) {
    parts.push(String(draft.state));
  }

  if (draft.skills) {
    const skillsArr = Array.isArray(draft.skills)
      ? draft.skills
      : String(draft.skills).split(/[,\s]+/);

    const latinSkills = skillsArr.filter(s => /^[\x00-\x7F]+$/.test(s));
    if (latinSkills.length) {
      parts.push(latinSkills.join(' '));
    }
  }

  if (draft.workType && /^[\x00-\x7F]+$/.test(draft.workType)) {
    parts.push(String(draft.workType));
  }

  if (draft.experienceYears) parts.push(String(draft.experienceYears));
  if (draft.expectedSalary) parts.push(String(draft.expectedSalary));

  return parts
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

app.post('/api/profile/complete', async (req, res) => {
  const { sessionId, draft: directDraft } = req.body || {};

  let draft;
  if (sessionId && sessions.has(sessionId)) {
    draft = sessions.get(sessionId);
  } else if (directDraft) {
    draft = directDraft;
  } else {
    return res.status(400).json({ error: 'Invalid session' });
  }

  const trustScore = calculateTrustScore(draft);

  const worker = {
    ...draft,
    trustScore,
    trustMeta: {
      avgRating: 0,
      sentimentScore01: 0.5,
      consistency: 0,
      experience: Number(draft.experienceYears || 0),
      activity: 0,
      reviewsCount: 0,
      rehireProbability: 0,
      cluster: 'average',
    },
    // hire status
    isHired: false,
    currentEmployerPhone: null,
    lastHiredAt: null,
    hireHistory: [],

    createdAt: new Date().toISOString(),
    safety: {
      emergencyContactAdded: !!draft.emergencyContact,
      emergencyContact: draft.emergencyContact
    },
    searchKey_en: buildSearchKeyEn(draft),
    feedbacks: [],
    feedbackCount: 0
  };

  try {
    if (workersCollection) {
      const result = await workersCollection.insertOne(worker);
      worker._id = result.insertedId;
    } else {
      worker._id = workers.length + 1;
      workers.push(worker);
    }

    if (sessionId) sessions.delete(sessionId);
    res.json({ worker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save worker' });
  }
});

/* ------------------ EMPLOYER SEARCH ------------------ */

app.get('/api/workers', async (req, res) => {
  const { cityArea, skill, minExp, maxSalary, q } = req.query;

  const query = {};

  if (!q && cityArea) {
    query.$or = [
      { city: { $regex: cityArea, $options: 'i' } },
      { cityArea: { $regex: cityArea, $options: 'i' } }
    ];
  }

  if (skill) {
    query.skills = { $elemMatch: { $regex: skill, $options: 'i' } };
  }

  if (minExp !== undefined && minExp !== '') {
    query.$expr = {
      $gte: [{ $toInt: "$experienceYears" }, Number(minExp)]
    };
  }

  if (maxSalary !== undefined && maxSalary !== '') {
    query.$expr = {
      $lte: [{ $toInt: "$expectedSalary" }, Number(maxSalary)]
    };
  }

  if (q) {
    const normalizedQ = String(q).toLowerCase().trim();
    if (normalizedQ) {
      query.$or = [
        { searchKey_en: { $regex: normalizedQ, $options: 'i' } },
        { cityArea:     { $regex: normalizedQ, $options: 'i' } },
        { city:         { $regex: normalizedQ, $options: 'i' } }
      ];
    }
  }

  try {
    const mongoWorkers = await workersCollection
      .find(query)
      .sort({ trustScore: -1 })
      .toArray();
    res.json({ workers: mongoWorkers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

/* ------------------ USER AUTH ------------------ */

app.post('/api/signup', async (req, res) => {
  try {
    const { name, phone, email, password, role, city } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    const existing = await usersCollection.findOne({ phone });

    if (existing) {
      return res.status(400).json({ error: "Phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      phone,
      email,
      city,
      role,
      password: hashedPassword,
      createdAt: new Date(),
      safetyIncidents: 0,
      isBlocked: false,
    };

    await usersCollection.insertOne(user);

    res.json({ message: "User created" });

  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await usersCollection.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: "Phone number not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: 'Your account has been blocked due to safety incidents.',
      });
    }

    res.json({ message: "Login success", user });

  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

/* ------------------ FEEDBACK SYSTEM ------------------ */

app.post("/api/feedback", async (req, res) => {
  try {
    const {
      employerName,
      date,
      emergencyContact,
      ratings,
      improvementSuggestions
    } = req.body;

    if (!employerName || !emergencyContact || !ratings) {
      return res.status(400).json({
        message: "Employer name, phone number, and ratings are required"
      });
    }

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact: emergencyContact },
        { "safety.emergencyContact": emergencyContact }
      ]
    });

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found with this phone number. Please verify."
      });
    }

    const numericRating = mapSatisfactionToRating(
      ratings.overallSatisfaction
    );

    const sentimentScore01 = computeSentimentScore(
      improvementSuggestions || ""
    );

    const nowISO = new Date().toISOString();

    const feedback = {
      employerName,
      date: date || nowISO,
      ratings,
      improvementSuggestions: improvementSuggestions || "",
      createdAt: nowISO,
      numericRating,
      sentimentScore01
    };

    await workersCollection.updateOne(
      { _id: worker._id },
      {
        $push: { feedbacks: feedback },
        $inc: { feedbackCount: 1 }
      }
    );

    await recomputeWorkerTrust(worker._id);

    const updatedWorker = await workersCollection.findOne({ _id: worker._id });

    res.status(201).json({
      message: "Feedback submitted successfully!",
      workerName: worker.name,
      trustScore: updatedWorker.trustScore,
      trustMeta: updatedWorker.trustMeta,
      feedback
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/workers/by-phone/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact: phone },
        { "safety.emergencyContact": phone }
      ]
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      name: worker.name,
      role: worker.role || worker.workType || "Housekeeper",
      emergencyContact: worker.emergencyContact || worker.safety?.emergencyContact
    });

  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ HIRE STATUS (EMPLOYER) ------------------ */

app.post('/api/workers/:id/hire', async (req, res) => {
  try {
    const { id } = req.params;
    const { employerPhone } = req.body || {};

    if (!employerPhone) {
      return res.status(400).json({ message: 'Employer phone required' });
    }

    const employerUser = await usersCollection.findOne({
      phone: employerPhone,
      role: 'employer',
    });

    if (!employerUser) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    if (employerUser.isBlocked) {
      return res.status(403).json({
        message: 'Your account has been blocked due to safety incidents.',
      });
    }

    const result = await workersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isHired: true,
          currentEmployerPhone: employerPhone,
          lastHiredAt: new Date().toISOString(),
        },
      }
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ message: 'Worker marked as hired' });
  } catch (err) {
    console.error('Hire error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/workers/:id/release', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await workersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isHired: false,
          currentEmployerPhone: null,
        },
      }
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ message: 'Worker marked as available' });
  } catch (err) {
    console.error('Release error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ------------------ HIRE STATUS (WORKER SELF) ------------------ */

app.post('/api/worker/self-hire', async (req, res) => {
  try {
    const {
      emergencyContact,
      employerName,
      employerPhone,
      householdName,
      fromDate
    } = req.body || {};

    if (!emergencyContact || !employerName || !fromDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact },
        { 'safety.emergencyContact': emergencyContact },
      ],
    });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const hireEntry = {
      employerName,
      employerPhone: employerPhone || null,
      householdName: householdName || null,
      fromDate,
      toDate: null,
      createdAt: new Date().toISOString(),
    };

    await workersCollection.updateOne(
      { _id: worker._id },
      {
        $set: {
          isHired: true,
          currentEmployerPhone: employerPhone || null,
          lastHiredAt: fromDate,
        },
        $push: { hireHistory: hireEntry },
      }
    );

    res.json({ message: 'Hire status updated', hireEntry });
  } catch (err) {
    console.error('Self hire error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/worker/self-release', async (req, res) => {
  try {
    const { emergencyContact, endDate } = req.body || {};

    if (!emergencyContact) {
      return res.status(400).json({ message: 'Worker phone required' });
    }

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact },
        { 'safety.emergencyContact': emergencyContact },
      ],
    });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const latest = (worker.hireHistory || []).slice(-1)[0];
    if (!latest || latest.toDate) {
      await workersCollection.updateOne(
        { _id: worker._id },
        {
          $set: {
            isHired: false,
            currentEmployerPhone: null,
          },
        }
      );
      return res.json({ message: 'Marked as available' });
    }

    await workersCollection.updateOne(
      { _id: worker._id, 'hireHistory.fromDate': latest.fromDate },
      {
        $set: {
          'hireHistory.$.toDate': endDate || new Date().toISOString(),
          isHired: false,
          currentEmployerPhone: null,
        },
      }
    );

    res.json({ message: 'Job closed, worker available' });
  } catch (err) {
    console.error('Self release error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ------------------ PANIC / INCIDENTS ------------------ */

app.post('/api/worker/panic', async (req, res) => {
  try {
    const { workerPhone, employerPhone, notes } = req.body || {};
    if (!workerPhone || !employerPhone) {
      return res.status(400).json({ message: 'Worker and employer phone required' });
    }

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact: workerPhone },
        { 'safety.emergencyContact': workerPhone },
      ],
    });
    const employer = await usersCollection.findOne({ phone: employerPhone, role: 'employer' });

    if (!worker || !employer) {
      return res.status(404).json({ message: 'Worker or employer not found' });
    }

    const incident = {
      workerId: worker._id,
      employerId: employer._id,
      workerPhone,
      employerPhone,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    const db = req.app.locals.db;
    await db.collection('incidents').insertOne(incident); // [web:69]

    const updated = await usersCollection.findOneAndUpdate(
      { _id: employer._id },
      { $inc: { safetyIncidents: 1 } },
      { returnDocument: 'after' }
    ); // [web:64][web:68]

    const count = updated.value?.safetyIncidents || 0;

    if (count >= 2) {
      await usersCollection.updateOne(
        { _id: employer._id },
        { $set: { isBlocked: true } }
      );
    }

    res.json({
      message: 'Incident reported',
      safetyIncidents: count,
      blocked: count >= 2,
    });
  } catch (err) {
    console.error('Panic error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ------------------ PDF ------------------ */

app.post('/api/workers/:id/generate-pdf', async (req, res) => {
  const { id } = req.params;

  let worker;
  if (workersCollection) {
    worker = await workersCollection.findOne({ _id: new ObjectId(id) });
  } else {
    worker = workers.find(w => String(w._id) === String(id));
  }

  if (!worker) return res.status(404).json({ error: 'Worker not found' });

  const pdfPath = path.join(uploadsDir, `worker_${id}.pdf`);
  await generateWorkerPDF(worker, pdfPath);

  res.json({ pdfUrl: `/uploads/worker_${id}.pdf` });
});

app.get("/api/workers/:phone/feedbacks", async (req, res) => {
  try {
    const { phone } = req.params;

    const worker = await workersCollection.findOne({
      $or: [
        { emergencyContact: phone },
        { "safety.emergencyContact": phone }
      ]
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      workerName: worker.name,
      totalFeedbacks: worker.feedbackCount || 0,
      feedbacks: worker.feedbacks || []
    });

  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ HEALTH ------------------ */

app.get('/', (_, res) => {
  res.send('KaamWali.AI backend running');
});

/* ------------------ SERVER ------------------ */

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    const db = await connectDB();
    workersCollection = db.collection('workers');
    usersCollection = db.collection('users');
    app.locals.db = db; // expose for incidents etc. [web:71]
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB failed, using memory mode');
    workersCollection = null;
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
})();