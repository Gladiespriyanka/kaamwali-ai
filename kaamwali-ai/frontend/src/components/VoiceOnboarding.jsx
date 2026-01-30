// src/components/VoiceOnboarding.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { API_BASE, completeWorkerProfile } from '../api';
import '../styles/voiceOnboarding.css';

const FIELD_QUESTIONS = {
  name: {
    hi: 'Aapka poora naam kya hai? Kripya apna naam saaf saaf batayein.',
    en: 'What is your full name? Please say your name clearly.'
  },
  cityArea: {
    hi: 'Aap kaunsi jagah mein rehti hain? Shehar aur area ka naam batayein.',
    en: 'Which city and area do you live in?'
  },
  age: {
    hi: 'Aapki umar kitni hai? Number mein batayein, jaise 25 saal.',
    en: 'How old are you? Say your age in years, like 25.'
  },
  experienceYears: {
    hi: 'Aap kitne saal se ghar ka kaam kar rahi hain?',
    en: 'For how many years have you been doing this work?'
  },
  skills: {
    hi: 'Aapko kaun se kaam ache se aate hain? Safai, khana banana, bachchon ka dhyaan, ya kuch aur?',
    en: 'Which tasks can you do well? Cleaning, cooking, childcare, or something else?'
  },
  expectedSalary: {
    hi: 'Aap mahine ka kitna paisa expect karti hain? Jaise 8000 ya 10000 rupaye.',
    en: 'What monthly salary do you expect? For example, 8000 or 10000 rupees.'
  },
  availability: {
    hi: 'Aap kaun se time par kaam kar sakti hain? Subah, dopahar, ya shaam? Kaun se din kaam kar sakti hain?',
    en: 'At what time can you work? Morning, afternoon, or evening? And which days of the week?'
  },
  emergencyContact: {
    hi: 'Emergency ke liye kis ka phone number diya ja sakta hai? Naam aur number batayein.',
    en: 'Who can we call in an emergency? Please say their name and phone number.'
  },
  comfortableWithFamilies: {
    hi: 'Kya aap joint family ya bade parivaar ke saath kaam karne mein comfortable hain? Haan ya nahi.',
    en: 'Are you comfortable working with joint or large families? Yes or no.'
  },
  comfortableWithPets: {
    hi: 'Kya aap kutte ya billiyan jaise pets wale ghar mein kaam karne mein comfortable hain? Haan ya nahi.',
    en: 'Are you comfortable working in homes with pets like dogs or cats? Yes or no.'
  }
};

const VoiceOnboarding = ({ onProfileReady }) => {
  const navigate = useNavigate();
  const { listening, text, setText, startListening, stopListening } = useSpeechToText();

  // step: initial = free speech, asking = follow-up questions, finalizing = spinner
  const [step, setStep] = useState('initial');
  const [sessionId, setSessionId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // helper: call backend /api/profile/complete and notify parent
  const handleProfileComplete = async (sessId, latestDraft) => {
    try {
      setStep('finalizing');
      const worker = await completeWorkerProfile(sessId || sessionId, latestDraft || draft);
      onProfileReady(worker);
    } catch (err) {
      console.error(err);
      setError('Error creating profile');
      alert('Error creating profile');
      setStep('asking');
    }
  };

  // FIRST step: send free-speech text to /api/profile/start
  const startInitialDraft = async () => {
    if (!text.trim()) {
      alert('Please speak some details first.');
      return;
    }
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/profile/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();

      setSessionId(data.sessionId);
      setDraft(data.draft);
      setMissingFields(data.missingFields || []);

      if (data.missingFields && data.missingFields.length > 0) {
        setCurrentField(data.missingFields[0]);
        setStep('asking');
        setText('');
      } else {
        // nothing missing -> complete profile immediately
        await handleProfileComplete(data.sessionId, data.draft);
      }
    } catch (e) {
      console.error(e);
      setError('Server error – please try again.');
    } finally {
      setLoading(false);
    }
  };

  // FOLLOW-UP questions: /api/profile/answer
  const askNextField = async () => {
    if (!text.trim()) {
      alert('Please answer using your voice first.');
      return;
    }
    if (!sessionId || !currentField) {
      alert('Session error, please restart.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/profile/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          field: currentField,
          answerText: text
        })
      });
      const data = await res.json();

      setDraft(data.draft);
      setMissingFields(data.missingFields || []);
      setText('');

      if (data.missingFields && data.missingFields.length > 0) {
        setCurrentField(data.missingFields[0]);
      } else {
        // all questions done -> complete profile with latest draft
        await handleProfileComplete(data.sessionId, data.draft);
      }
    } catch (e) {
      console.error(e);
      setError('Server error – please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderInitialStep = () => (
    <div className="voice-card">
      <h2 className="voice-title">Apni jaankari sirf awaaz se bataiye</h2>
      <p className="voice-sub">
        Example (Hindi): “Mera naam Sunita hai, main 5 saal se Bhiwani mein safai
        aur khana banana ka kaam karti hoon, subah 7 se 11 baje tak available hoon.”
      </p>
      <p className="voice-sub-muted">
        Example (English): “My name is Sunita, I have 5 years of experience in cleaning
        and cooking in Bhiwani. I can work in the morning.”
      </p>

      <div className="voice-controls">
        <button
          type="button"
          className={`voice-btn voice-btn-small ${
            listening ? 'voice-btn-danger' : 'voice-btn-primary'
          }`}
          onClick={listening ? stopListening : startListening}
          disabled={loading}
        >
          {listening ? 'Stop recording' : 'Tap to speak'}
        </button>
        <span className="voice-hint">
          {listening ? 'Listening…' : 'Tap and speak in Hindi or simple English'}
        </span>
      </div>

      <textarea
        className="voice-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your spoken text will appear here so you can review it before continuing."
      />

      {error && <p className="voice-error">{error}</p>}

      <button
        type="button"
        className="voice-btn voice-btn-primary"
        onClick={startInitialDraft}
        disabled={loading}
      >
        {loading ? 'Understanding your details…' : 'Continue'}
      </button>

      <p className="voice-small">
        Tip: Boliye jaise aap kisi ghar wale ko apne baare mein bata rahi hain.
      </p>
    </div>
  );

  const renderAskingStep = () => {
    const q = FIELD_QUESTIONS[currentField] || {};
    const total = Object.keys(FIELD_QUESTIONS).length;
    const filled = total - (missingFields.length || 0);
    const stepNumber = filled + 1;

    return (
      <div className="voice-card">
        <p className="voice-progress">
          Step {stepNumber} of {total}
        </p>
        <h2 className="voice-title">Thodi aur jaankari chahiye</h2>

        <p className="voice-sub">{q.hi}</p>
        <p className="voice-sub-muted">{q.en}</p>

        <div className="voice-controls">
          <button
            type="button"
            className={`voice-btn voice-btn-small ${
              listening ? 'voice-btn-danger' : 'voice-btn-primary'
            }`}
            onClick={listening ? stopListening : startListening}
            disabled={loading}
          >
            {listening ? 'Stop recording' : 'Tap to answer'}
          </button>
          <span className="voice-hint">
            {listening
              ? 'Listening…'
              : 'Answer in Hindi or English using your voice'}
          </span>
        </div>

        <textarea
          className="voice-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your answer will appear here after speaking. You can edit if needed."
        />

        {error && <p className="voice-error">{error}</p>}

        <button
          type="button"
          className="voice-btn voice-btn-primary"
          onClick={askNextField}
          disabled={loading}
        >
          {loading ? 'Saving your answer…' : 'Save answer'}
        </button>

        <p className="voice-small">
          Filled so far: {filled} / {total}
        </p>
      </div>
    );
  };

  const renderFinalizing = () => (
    <div className="voice-card">
      <h2 className="voice-finalizing-title">Creating your profile…</h2>
      <p className="voice-finalizing-sub">
        We are putting together your answers into a clear profile that employers can
        understand quickly.
      </p>
      {error && <p className="voice-error">{error}</p>}
    </div>
  );

  return (
    <div className="voice-page">
      <header className="voice-header">
        <div
          className="voice-header-logo"
          onClick={() => navigate('/worker-dashboard')}
        >
          KaamWali.AI
        </div>
      </header>

      <main className="voice-main">
        {step === 'initial' && renderInitialStep()}
        {step === 'asking' && renderAskingStep()}
        {step === 'finalizing' && renderFinalizing()}
      </main>
    </div>
  );
};

export default VoiceOnboarding;
