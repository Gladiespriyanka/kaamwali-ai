// backend/index.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { ObjectId } from 'mongodb';

import generateWorkerPDF from './generateWorkerPDF.js';
import {
  extractInitialDraft,
  updateDraftWithField,
  calculateTrustScore
} from './profileParser.js';
import { connectDB } from './db.js';
import i18nRouter from './routes/i18n.js'; // 🔹 NEW

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', i18nRouter); //

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
function buildSearchKeyEn(draft) {
  const parts = [];

  if (draft.name) parts.push(draft.name);
  if (draft.city) parts.push(draft.city);
  if (draft.cityArea) parts.push(draft.cityArea);
  if (draft.state) parts.push(draft.state);
  if (draft.skills) {
    if (Array.isArray(draft.skills)) {
      parts.push(draft.skills.join(' '));
    } else {
      parts.push(String(draft.skills));
    }
  }
  if (draft.workType) parts.push(draft.workType);
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
    // 🔹 NEW: English-normalized search key
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
  const { cityArea, skill, minExp, maxSalary } = req.query;

  // -------- MEMORY MODE --------
  if (!workersCollection) {
    const filtered = workers.filter((w) => {

      // City
      if (cityArea && w.cityArea) {
        if (!w.cityArea.toLowerCase().includes(cityArea.toLowerCase()))
          return false;
      }

      // Skill
      if (skill && w.skills?.length) {
        const s = skill.toLowerCase();
        if (!w.skills.some(sk => sk.toLowerCase().includes(s)))
          return false;
      }

      // ✅ Min Experience (STRING → NUMBER)
      // ✅ Min Experience (robust parsing)
      if (minExp) {
        let workerExp = 0;

        if (typeof w.experienceYears === 'number') {
          workerExp = w.experienceYears;
        } else if (typeof w.experienceYears === 'string') {
          // extract first number from string
          const match = w.experienceYears.match(/\d+/);
          workerExp = match ? Number(match[0]) : 0;
        }

        if (workerExp < Number(minExp)) {
          return false;
        }
      }

      // ✅ Max Salary (STRING → NUMBER)
      if (maxSalary) {
        const workerSalary = parseInt(w.expectedSalary); // "6000 / month" → 6000
        if (isNaN(workerSalary) || workerSalary > Number(maxSalary))
          return false;
      }

      return true;
    });

    return res.json({ workers: filtered });
  }

  console.log('WORKER OBJECT SAMPLE:', workers[0]);
  // -------- MONGODB MODE --------
  const query = {};

  if (cityArea) {
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

  try {
    const mongoWorkers = await workersCollection.find(query).toArray();
    res.json({ workers: mongoWorkers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch workers' });
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
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB failed, using memory mode');
    workersCollection = null;
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
})();
