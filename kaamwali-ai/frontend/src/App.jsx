// src/App.jsx
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import './styles/main.css';

// import Landing from './components/Landing';
import VoiceOnboarding from './components/VoiceOnboarding';
import WorkerProfile from './components/WorkerProfile';
import WorkersList from './components/WorkersList';
import AuthPage from './components/AuthPage';
import WorkerDashboard from './components/WorkerDashboard';      // NEW
import EmployerDashboard from './components/EmployerDashboard';  // NEW
import Feedback from './components/Feedback';
import { getMetrics } from './api';

/* ---------- MAIN APP CONTENT (after login) ---------- */

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

  // Map URL changes to mode (within the "app" area)
  useEffect(() => {
  const pathToMode = {
    '/app': 'landing',
    '/worker-onboard': 'worker-onboard',
    '/worker-profile': 'worker-profile'
  };

  if (pathToMode[window.location.pathname]) {
    setMode(pathToMode[window.location.pathname]);
  }
}, []);

  const handleWorkerFlowStart = () => {
    setMode('worker-onboard');
    navigate('/worker-onboard');
    setWorker(null);
  };

  const handleEmployerFlowStart = () => {
    navigate('/');
  };

  const handleProfileReady = (newWorker) => {
    setWorker(newWorker);
    setMode('worker-profile');
    navigate('/worker-profile');
    getMetrics().then(setMetrics).catch(() => {});
  };

  return (
    <div>
      {/* keep your existing topbar */}
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

        
      </main>
    </div>
  );
};

/* ---------- ROUTES: AUTH FIRST, THEN APP ---------- */

const AppRoutes = () => {
  const navigate = useNavigate();

  // called when login / signup finishes successfully
  const handleAuthSuccess = (userType) => {
    if (userType === 'worker') {
      navigate('/worker-dashboard');    // Worker section -> WorkerDashboard
    } else {
      navigate('/employer-dashboard');  // Employer section -> EmployerDashboard
    }
  };

  return (
    <Routes>
      {/* First page: login / signup */}
      <Route path="/" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />

      {/* Worker & Employer dashboards */}
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      <Route path="/employer-dashboard" element={<EmployerDashboard />} />
<Route path="/for-employers" element={<WorkersList />} />
<Route path="/feedback" element={<Feedback />} />
      {/* Main app flows (metrics + voice onboarding + profile + employers) */}
      <Route path="/app" element={<AppContent />} />
      <Route path="/worker-onboard" element={<AppContent />} />
      <Route path="/worker-profile" element={<AppContent />} />
     

      {/* Any unknown URL → go to auth */}
      <Route path="*" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
