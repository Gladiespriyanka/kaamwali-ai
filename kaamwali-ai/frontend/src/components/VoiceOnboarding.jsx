// frontend/src/components/VoiceOnboarding.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { API_BASE, completeWorkerProfile } from '../api';
import '../styles/voiceOnboarding.css';
import { useLanguage } from '../contexts/LanguageContext';

const NUMERIC_FIELDS = ['age', 'experienceYears', 'expectedSalary'];

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
  'comfortableWithPets',
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
  const { language, messages } = useLanguage();

  const {
    listening,
    text,
    setText,
    startListening,
    stopListening,
  } = useSpeechToText(language);

  const v = (messages && messages.voiceOnboarding) || {};
  const q = (messages && messages.questions) || {};
  const ex = (messages && messages.examples) || {};

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
      const msg =
        language === 'hi'
          ? 'प्रोफ़ाइल बनाने में समस्या आई।'
          : 'Error creating profile';
      setError(msg);
      alert(msg);
      setStep('asking');
    }
  };

  const startInitialDraft = async () => {
    if (!text.trim()) {
      alert(
        language === 'hi'
          ? 'कृपया पहले कुछ बोलें।'
          : 'Please speak some details first.'
      );
    } else {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`${API_BASE}/api/profile/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
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
        setError(
          language === 'hi'
            ? 'सर्वर में दिक्कत है, कृपया दोबारा कोशिश करें।'
            : 'Server error – please try again.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const askNextField = async () => {
    const answer = text.trim();

    if (!answer) {
      alert(
        language === 'hi'
          ? 'कृपया पहले आवाज़ से जवाब दें।'
          : 'Please answer using your voice first.'
      );
      return;
    }
    if (!sessionId || !currentField) {
      alert(
        language === 'hi'
          ? 'सेशन में दिक्कत है, कृपया फिर से शुरू करें।'
          : 'Session error, please restart.'
      );
      return;
    }

    if (NUMERIC_FIELDS.includes(currentField) && !isNumericAnswer(answer)) {
      alert(
        language === 'hi'
          ? 'कृपया इस सवाल का जवाब सिर्फ नंबर में दें, जैसे 25 या 8000।'
          : 'Please answer this question using numbers only, like 25 or 8000.'
      );
      return;
    }

    if (NON_NUMERIC_FIELDS.includes(currentField) && hasDigits(answer)) {
      alert(
        language === 'hi'
          ? 'कृपया इस सवाल का जवाब सिर्फ शब्दों में दें, नंबर न लिखें।'
          : 'Please answer this question using words only, not numbers.'
      );
      return;
    }

    if (currentField === 'emergencyContact' && !isValidPhone10(answer)) {
      alert(
        language === 'hi'
          ? 'कृपया 10 अंकों का मोबाइल नंबर बताएं।'
          : 'Please say a 10-digit phone number for emergency contact.'
      );
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
          answerText: answer,
        }),
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
      setError(
        language === 'hi'
          ? 'सर्वर में दिक्कत है, कृपया दोबारा कोशिश करें।'
          : 'Server error – please try again.'
      );
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
      <h2 className="voice-title">
        {v.initialTitle || 'Tell us about yourself using only your voice'}
      </h2>
      <p className="voice-sub">
        {ex.initialExampleMain ||
          '“My name is Sunita. I have 5 years of experience in cleaning and cooking in Bhiwani. I am available from 7am to 11am.”'}
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
          {listening
            ? (language === 'hi' ? 'रेकॉर्डिंग बंद करें' : 'Stop recording')
            : (language === 'hi' ? 'बात करना शुरू करें' : 'Tap to speak')}
        </button>
        <span className="voice-hint">
          {listening
            ? (language === 'hi' ? 'सुन रहे हैं…' : 'Listening…')
            : (v.initialHint ||
                (language === 'hi'
                  ? 'हिंदी या सिंपल इंग्लिश में बात करें'
                  : 'Tap and speak in your language'))}
        </span>
      </div>

      <textarea
        className="voice-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          language === 'hi'
            ? 'आपका बोला हुआ यहाँ लिखकर दिखेगा। आगे बढ़ने से पहले आप इसे देख सकती हैं।'
            : 'Your spoken text will appear here so you can review it before continuing.'
        }
      />

      {error && <p className="voice-error">{error}</p>}

      <button
        type="button"
        className="voice-btn voice-btn-primary"
        onClick={startInitialDraft}
        disabled={loading}
      >
        {loading
          ? (v.saving ||
              (language === 'hi'
                ? 'आपकी जानकारी समझी जा रही है…'
                : 'Understanding your details…'))
          : (v.initialContinue || (language === 'hi' ? 'आगे बढ़ें' : 'Continue'))}
      </button>
    </div>
  );

  const renderAskingStep = () => {
    const total = fieldHistory.length || 1;
    const stepNumber = total;

    const mainQuestion = q[currentField] || '';

    return (
      <div className="voice-card">
        <p className="voice-progress">
          {language === 'hi'
            ? `स्टेप ${stepNumber} / ${initialMissingCount || total}`
            : `Step ${stepNumber} of ${initialMissingCount || total}`}
        </p>
        <h2 className="voice-title">
          {v.askingTitle ||
            (language === 'hi' ? 'थोड़ी और जानकारी चाहिए' : 'We need a bit more information')}
        </h2>

        <p className="voice-sub">{mainQuestion}</p>

        <div className="voice-controls">
          <button
            type="button"
            className={`voice-btn voice-btn-small ${
              listening ? 'voice-btn-danger' : 'voice-btn-primary'
            }`}
            onClick={listening ? stopListening : startListening}
            disabled={loading}
          >
            {listening
              ? (language === 'hi' ? 'रेकॉर्डिंग बंद करें' : 'Stop recording')
              : (language === 'hi' ? 'जवाब बोलकर दें' : 'Tap to answer')}
          </button>
          <span className="voice-hint">
            {listening
              ? (language === 'hi' ? 'सुन रहे हैं…' : 'Listening…')
              : (language === 'hi'
                  ? 'हिंदी या इंग्लिश में आवाज़ से जवाब दें'
                  : 'Answer using your voice')}
          </span>
        </div>

        <textarea
          className="voice-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            language === 'hi'
              ? 'आप बोलेंगी तो आपका जवाब यहाँ लिखकर दिखेगा। ज़रूरत हो तो आप इसे बदल भी सकती हैं।'
              : 'Your answer will appear here after speaking. You can edit if needed.'
          }
        />

        {error && <p className="voice-error">{error}</p>}

        <div className="voice-actions-row">
          <button
            type="button"
            className="voice-btn voice-btn-small"
            onClick={goToPreviousField}
            disabled={loading || fieldHistory.length <= 1}
          >
            {v.back || (language === 'hi' ? 'पीछे' : 'Back')}
          </button>
          <button
            type="button"
            className="voice-btn voice-btn-primary"
            onClick={askNextField}
            disabled={loading}
          >
            {loading
              ? (v.saving || (language === 'hi' ? 'सेव हो रहा है…' : 'Saving…'))
              : (v.next || (language === 'hi' ? 'आगे' : 'Next'))}
          </button>
        </div>
      </div>
    );
  };

  const renderFinalizing = () => (
    <div className="voice-card">
      <h2 className="voice-finalizing-title">
        {v.finalizingTitle ||
          (language === 'hi' ? 'आपकी प्रोफ़ाइल बन रही है…' : 'Creating your profile…')}
      </h2>
      <p className="voice-finalizing-sub">
        {v.finalizingSub ||
          (language === 'hi'
            ? 'हम आपके जवाबों को एक साफ़ और सिंपल प्रोफ़ाइल में डाल रहे हैं जिसे एम्प्लॉयर जल्दी समझ सकें।'
            : 'We are putting together your answers into a clear profile that employers can understand quickly.')}
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
