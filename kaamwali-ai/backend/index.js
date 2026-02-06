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
import i18nRouter from './routes/i18n.js'; // 🔹 NEW
import { CITY_MAP } from './cityMap.js';

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

const workers = [];            // in-memory fallback
const sessions = new Map();    // voice onboarding sessions
let workersCollection = null;  // Mongo collection if connected
let usersCollection = null;

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
  const base = cleaned.split(',')[0]; // before comma

  return CITY_MAP[cleaned] || CITY_MAP[base] || cleaned;
}
function buildSearchKeyEn(draft) {
  const parts = [];

  // 1) Name: keep as-is if already Latin, otherwise skip from searchKey_en
  if (draft.name && /^[\x00-\x7F]+$/.test(draft.name)) {
    parts.push(String(draft.name));
  }

  // 2) Normalized city/cityArea (Latin via CITY_MAP)
  if (draft.cityArea) parts.push(normalizeCity(draft.cityArea));
  if (draft.city) parts.push(normalizeCity(draft.city));

  // 3) Normalized state if you have a map, otherwise keep if Latin
  if (draft.state && /^[\x00-\x7F]+$/.test(draft.state)) {
    parts.push(String(draft.state));
  }

  // 4) Skills: include only Latin tokens
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
    createdAt: new Date().toISOString(),
    safety: {
      emergencyContactAdded: !!draft.emergencyContact,
      emergencyContact: draft.emergencyContact
    },
    // 🔹 English-normalized search key (with city normalization)
    searchKey_en: buildSearchKeyEn(draft)
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

// 🔥 THIS IS THE IMPORTANT PART 🔥
app.get('/api/workers', async (req, res) => {
  const { cityArea, skill, minExp, maxSalary, q } = req.query;

  const query = {};

  // Only apply the old city filter when there's NO q
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

  // NEW: generic multi-field search for ANY city
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
    const mongoWorkers = await workersCollection.find(query).toArray();
    res.json({ workers: mongoWorkers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

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
    // 👇 PASSWORD HASH YAHAN HOGA
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      phone,
      email,
      city,
      role,
      password: hashedPassword,   // 👈 YEH LINE
      createdAt: new Date()
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

    // 🔴 PHONE se hi user find hoga (email hata diya)
    const user = await usersCollection.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: "Phone number not registered" });
    }

    // password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({ message: "Login success", user });

  } catch (err) {
    res.status(500).json({ error: "Login failed" });
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
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB failed, using memory mode');
    workersCollection = null;
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
})();
