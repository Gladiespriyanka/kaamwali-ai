import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
  extractInitialDraft,
  updateDraftWithField,
  calculateTrustScore
} from './profileParser.js';
import { connectDB } from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory stores
const workers = [];             // fallback store
const sessions = new Map();    // sessions are fine in memory

let workersCollection = null;  // Mongo collection when available

function createSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2);
}

// 1) Start profile from free-speech text
app.post('/api/profile/start', (req, res) => {
  const { text } = req.body || {};
  const sessionId = createSessionId();

  const { draft, missingFields } = extractInitialDraft(text || '');
  sessions.set(sessionId, draft);

  res.json({ sessionId, draft, missingFields });
});

// 2) Answer a specific field
app.post('/api/profile/answer', (req, res) => {
  const { sessionId, field, answerText } = req.body || {};

  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }
  if (!field) {
    return res.status(400).json({ error: 'Missing field' });
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

// 3) Complete profile and save worker (MongoDB if available, else memory)
app.post('/api/profile/complete', async (req, res) => {
  const { sessionId } = req.body || {};
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  const draft = sessions.get(sessionId);
  const trustScore = calculateTrustScore(draft);

  const worker = {
    ...draft,
    trustScore,
    createdAt: new Date().toISOString()
  };

  try {
    if (workersCollection) {
      // Save to MongoDB
      const result = await workersCollection.insertOne(worker);
      worker._id = result.insertedId;
    } else {
      // Fallback: save in memory
      const id = workers.length + 1;
      worker.id = id;
      workers.push(worker);
    }

    sessions.delete(sessionId);
    res.json({ worker });
  } catch (err) {
    console.error('Error saving worker', err);
    res.status(500).json({ error: 'Failed to save worker' });
  }
});

// 4) Employer: list workers with basic filters
//    Uses MongoDB if available, otherwise the in-memory array
app.get('/api/workers', async (req, res) => {
  const { cityArea, skill } = req.query;

  // Memory-only path
  if (!workersCollection) {
    const filtered = workers.filter((w) => {
      if (cityArea && w.cityArea) {
        if (w.cityArea.toLowerCase() !== String(cityArea).toLowerCase()) {
          return false;
        }
      }
      if (skill && w.skills && w.skills.length) {
        const s = String(skill).toLowerCase();
        const matches = w.skills.some((sk) =>
          String(sk).toLowerCase().includes(s)
        );
        if (!matches) return false;
      }
      return true;
    });

    return res.json({ workers: filtered });
  }

  // MongoDB path
  const query = {};

  if (cityArea) {
    query.cityArea = { $regex: String(cityArea), $options: 'i' };
  }

  if (skill) {
    const s = String(skill).toLowerCase();
    // worker.skills is assumed to be an array of strings
    query.skills = { $elemMatch: { $regex: s, $options: 'i' } };
  }

  try {
    const mongoWorkers = await workersCollection.find(query).toArray();
    res.json({ workers: mongoWorkers });
  } catch (err) {
    console.error('Error fetching workers', err);
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('KaamWali.AI backend running');
});

const PORT = process.env.PORT || 4000;

// Start server + try Mongo; fall back to memory-only if TLS fails
(async () => {
  try {
    const db = await connectDB();
    workersCollection = db.collection('workers');
    console.log('DB connected');
  } catch (err) {
    console.error('MongoDB connection failed, running in memory-only mode');
    console.error(err); // Added detailed error logging
    workersCollection = null;
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
})();
