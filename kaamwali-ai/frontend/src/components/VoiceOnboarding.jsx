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
    hi: 'Aap kitne saal se ghar ka kaam kar rahi hain? Number mein batayein, jaise 3 saal.',
    en: 'For how many years have you been doing this work? Say it in numbers, like 3 years.'
  },
  skills: {
    hi: 'Aapko kaun se kaam ache se aate hain? Safai, khana banana, bachchon ka dhyaan, buzurgon ki dekhbhaal, ya kuch aur?',
    en: 'Which tasks can you do well? Cleaning, cooking, childcare, elder care, or something else?'
  },
  expectedSalary: {
    hi: 'Aap mahine ka kitna paisa expect karti hain? Number mein batayein, jaise 8000 ya 10000 rupaye.',
    en: 'What monthly salary do you expect? Say a number, for example 8000 or 10000 rupees.'
  },
  availability: {
    hi: 'Aap kaun se time par kaam kar sakti hain? Subah, dopahar, ya shaam? Kaun se din kaam kar sakti hain?',
    en: 'At what time can you work? Morning, afternoon, or evening? And which days of the week?'
  },
  workType: {
    hi: 'Aapko kaisa kaam pasand hai? Full-time, part-time, live-in (ghar mein rehkar), ya live-out (ghar ke bahar rehkar)?',
    en: 'What kind of work arrangement do you prefer? Full-time, part-time, live-in, or live-out?'
  },
  daysOff: {
    hi: 'Aapko hafte mein kitne din chhutti chahiye? Kaun sa din aap weekly off lena pasand karengi?',
    en: 'How many days off do you need in a week, and which day do you prefer as your weekly off?'
  },
  medicalConditions: {
    hi: 'Kya aapko koi medical problem ya allergy hai? Jaise dhool se, pets se, ya bhaari samaan uthane mein dikkat?',
    en: 'Do you have any medical conditions or allergies, like dust allergy, issues with pets, or difficulty lifting heavy items?'
  },
  willingLateOrTravel: {
    hi: 'Zarurat padne par kya aap kabhi kabhi der tak rukne ya parivaar ke saath travel karne ke liye tayyar hain?',
    en: 'If needed, are you willing to occasionally stay late or travel with the family?'
  },
  previousEmployerRef: {
    hi: 'Aapne pehle jinke yahan kaam kiya, unmein se kisi ek ka naam aur phone number bata sakti hain?',
    en: 'Can you share the name and phone number of a previous employer we can talk to?'
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

const NUMERIC_FIELDS = ['age', 'experienceYears', 'expectedSalary'];

// fields where we do NOT allow digits at all
const NON_NUMERIC_FIELDS = [
  'name',
  'skills',
  'availability',
  'workType',
  'daysOff',
  'medicalConditions',
  'willingLateOrTravel',
  'previousEmployerRef',
  'comfortableWithFamilies',
  'comfortableWithPets'
];

const isNumericAnswer = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[0-9]+$/.test(trimmed);
};

const hasDigits = (value) => /\d/.test(value);

const isValidPhone10 = (value) => {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10;
};

const VoiceOnboarding = ({ onProfileReady }) => {
  const navigate = useNavigate();
  const { listening, text, setText, startListening, stopListening } = useSpeechToText();

  const [step, setStep] = useState('initial');
  const [sessionId, setSessionId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialMissingCount, setInitialMissingCount] = useState(0);
  const [fieldHistory, setFieldHistory] = useState([]);

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
      setInitialMissingCount((data.missingFields || []).length);

      if (data.missingFields && data.missingFields.length > 0) {
        setCurrentField(data.missingFields[0]);
        setFieldHistory([data.missingFields[0]]);
        setStep('asking');
        setText('');
      } else {
        await handleProfileComplete(data.sessionId, data.draft);
      }
    } catch (e) {
      console.error(e);
      setError('Server error – please try again.');
    } finally {
      setLoading(false);
    }
  };

  const askNextField = async () => {
    const answer = text.trim();

    if (!answer) {
      alert('Please answer using your voice first.');
      return;
    }
    if (!sessionId || !currentField) {
      alert('Session error, please restart.');
      return;
    }

    // strict numeric-only fields
    if (NUMERIC_FIELDS.includes(currentField) && !isNumericAnswer(answer)) {
      alert('Please answer this question using numbers only, like 25 or 8000.');
      return;
    }

    // theory/text questions: disallow any digits
    if (NON_NUMERIC_FIELDS.includes(currentField) && hasDigits(answer)) {
      alert('Please answer this question using words only, not numbers.');
      return;
    }

    // phone validation for emergency contact: must contain exactly 10 digits
    if (currentField === 'emergencyContact' && !isValidPhone10(answer)) {
      alert('Please say a 10-digit phone number for emergency contact.');
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
          answerText: answer
        })
      });
      const data = await res.json();

      setDraft(data.draft);
      setMissingFields(data.missingFields || []);
      if (initialMissingCount === 0) {
        setInitialMissingCount((data.missingFields || []).length);
      }
      setText('');

      if (data.missingFields && data.missingFields.length > 0) {
        const nextField = data.missingFields[0];
        setCurrentField(nextField);
        setFieldHistory((prev) => [...prev, nextField]);
      } else {
        await handleProfileComplete(data.sessionId, data.draft);
      }
    } catch (e) {
      console.error(e);
      setError('Server error – please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousField = () => {
    setFieldHistory((prev) => {
      if (prev.length <= 1) return prev;

      const newHistory = prev.slice(0, -1);
      const prevField = newHistory[newHistory.length - 1];
      setCurrentField(prevField);

      if (draft) {
        const value = draft[prevField];
        let str = '';
        if (value != null) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            str = JSON.stringify(value);
          } else if (Array.isArray(value)) {
            str = value.join(', ');
          } else {
            str = String(value);
          }
        }
        setText(str);
      } else {
        setText('');
      }

      return newHistory;
    });
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
    </div>
  );

  const renderAskingStep = () => {
    const q = FIELD_QUESTIONS[currentField] || {};

    const total = fieldHistory.length || 1;
    const stepNumber = total;

    return (
      <div className="voice-card">
        <p className="voice-progress">
          Step {stepNumber} of {initialMissingCount || total}
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

        <div className="voice-actions-row">
          <button
            type="button"
            className="voice-btn voice-btn-small"
            onClick={goToPreviousField}
            disabled={loading || fieldHistory.length <= 1}
          >
            Back
          </button>
          <button
            type="button"
            className="voice-btn voice-btn-primary"
            onClick={askNextField}
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Next'}
          </button>
        </div>
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
