// backend/index.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
  extractInitialDraft,
  updateDraftWithField,
  calculateTrustScore
} from './profileParser.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory stores
const workers = [];
const sessions = new Map();

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

// 3) Complete profile and save worker
app.post('/api/profile/complete', (req, res) => {
  const { sessionId } = req.body || {};
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  const draft = sessions.get(sessionId);
  const trustScore = calculateTrustScore(draft);

  const id = workers.length + 1;
  const worker = {
    id,
    ...draft,
    trustScore,
    createdAt: new Date().toISOString()
  };
  workers.push(worker);

  sessions.delete(sessionId);

  res.json({ worker });
});

// 4) Employer: list workers with basic filters
app.get('/api/workers', (req, res) => {
  const { cityArea, skill } = req.query;

  const filtered = workers.filter((w) => {
    if (cityArea && w.cityArea) {
      if (w.cityArea.toLowerCase() !== String(cityArea).toLowerCase()) {
        return false;
      }
    }
    if (skill && w.skills && w.skills.length) {
      const s = String(skill).toLowerCase();
      const matches = w.skills.some((sk) => String(sk).toLowerCase().includes(s));
      if (!matches) return false;
    }
    return true;
  });

  res.json({ workers: filtered });
});

// Health check
app.get('/', (req, res) => {
  res.send('KaamWali.AI backend running');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});