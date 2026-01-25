import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import './styles/main.css';
import Landing from './components/Landing';
import VoiceOnboarding from './components/VoiceOnboarding';
import WorkerProfile from './components/WorkerProfile';
import WorkersList from './components/WorkersList'; // Your existing component for /employers
import { searchWorkers, getMetrics } from './api';

const AppContent = () => {
  const [mode, setMode] = useState('landing');
  const [worker, setWorker] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(() => {});
  }, []);

  // Map URL changes to mode (e.g., /worker-onboard → setMode)
  useEffect(() => {
    const pathToMode = {
      '/': 'landing',
      '/worker-onboard': 'worker-onboard',
      '/worker-profile': 'worker-profile',
      '/employers': 'employer'
    };
    const currentMode = pathToMode[window.location.pathname] || 'landing';
    setMode(currentMode);
  }, [window.location.pathname]);

  const handleWorkerFlowStart = () => {
    setMode('worker-onboard');
    navigate('/worker-onboard');
    setWorker(null);
  };

  const handleEmployerFlowStart = () => {
    navigate('/employers');
  };

  const handleProfileReady = (newWorker) => {
    setWorker(newWorker);
    setMode('worker-profile');
    navigate('/worker-profile');
    getMetrics().then(setMetrics).catch(() => {});
  };

  return (
    <div>
      <header className="topbar">
        <div className="topbar-logo">KaamWali.AI</div>
        <div className="topbar-right">
          {metrics ? (
            <span className="topbar-tagline">
              {metrics.workersCount} women onboarded · {metrics.employersCount} homes reached
            </span>
          ) : (
            <span className="topbar-tagline">Voice‑first jobs for domestic workers</span>
          )}
        </div>
      </header>

      <main className="page">
        {mode === 'landing' && (
          <Landing
            onWorkerClick={handleWorkerFlowStart}
            onEmployerClick={handleEmployerFlowStart}
          />
        )}

        {mode === 'worker-onboard' && (
          <div className="layout">
            <VoiceOnboarding onProfileReady={handleProfileReady} />
          </div>
        )}

        {mode === 'worker-profile' && (
          <div className="layout">
            <WorkerProfile
              worker={worker}
              onBack={() => {
                setMode('worker-onboard');
                navigate('/worker-onboard');
              }}
            />
          </div>
        )}

       {mode === 'employer' && (
  <>
    {/* Or <div className="layout layout-two"><EmployerSearch ... /></div> */}
    <WorkersList />
  </>
)}
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/worker-onboard" element={<AppContent />} />
      <Route path="/worker-profile" element={<AppContent />} />
      <Route path="/employers" element={<AppContent />} />
      {/* Add more as needed */}
    </Routes>
  </Router>
);

export default App;
