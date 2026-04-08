// src/components/WorkerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMetrics } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://kaamwali-ai-backend.onrender.com'; // [web:78]

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

  const [status, setStatus] = useState('unknown'); // 'unknown' | 'available' | 'hired' [web:80]
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    workerPhone: '',
    employerName: '',
    employerPhone: '',
    householdName: '',
    fromDate: '',
  });
  const [message, setMessage] = useState('');

  const { messages } = useLanguage();
  const t = (messages && messages.workerDashboard) || {};

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const callSelfHire = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/worker/self-hire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // [web:72][web:73]
        body: JSON.stringify({
          emergencyContact: form.workerPhone,
          employerName: form.employerName,
          employerPhone: form.employerPhone || undefined,
          householdName: form.householdName || undefined,
          fromDate: form.fromDate || new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Failed to update hire status');
      } else {
        setStatus('hired');
        setMessage('Marked as hired for this household.');
      }
    } catch (err) {
      console.error('self-hire error', err);
      setMessage('Server error while marking hired.');
    } finally {
      setLoading(false);
    }
  };

  const callSelfRelease = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/worker/self-release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emergencyContact: form.workerPhone,
          endDate: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Failed to update availability');
      } else {
        setStatus('available');
        setMessage('You are now marked as available for new work.');
      }
    } catch (err) {
      console.error('self-release error', err);
      setMessage('Server error while marking available.');
    } finally {
      setLoading(false);
    }
  };

  const statusLabel =
    status === 'hired'
      ? 'Hired (currently working)'
      : status === 'available'
      ? 'Available for work'
      : 'Status unknown (please update once)';

  const statusColor =
    status === 'hired' ? '#B91C1C' : status === 'available' ? '#166534' : '#6B7280';
  const statusBg =
    status === 'hired' ? '#FEE2E2' : status === 'available' ? '#DCFCE7' : '#E5E7EB';

  return (
    <>
      {/* Ratio bar (same as AppContent) */}
      <header className="topbar">
        <div className="topbar-logo">KaamWali.AI</div>
        <div className="topbar-right">
          {metrics ? (
            <span className="topbar-tagline">
              {metrics.workersCount}{' '}
              {t.taglineWorkersCount || 'women onboarded'}
              {' · '}
              {metrics.employersCount}{' '}
              {t.taglineEmployersCount || 'homes reached'}
            </span>
          ) : (
            <span className="topbar-tagline">
              {t.tagline}
            </span>
          )}
        </div>
      </header>

      {/* Worker dashboard UI (same as Landing.jsx, just wired to worker routes) */}
      <div className="kw-page">
        {/* Top navigation bar */}
        <header className="kw-nav">
          <div className="kw-logo">KaamWali.AI</div>
          <nav className="kw-nav-links">
            <button
              type="button"
              className="kw-nav-link"
              onClick={() => navigate('/worker-profile')}
            >
              {t.myProfile}
            </button>
            <button
              type="button"
              className="kw-nav-link"
              onClick={() => navigate('/worker-onboard')}
            >
              {t.workOpportunities}
            </button>
            <button
              type="button"
              className="kw-nav-cta"
              onClick={() => navigate('/worker-onboard')}
            >
              {t.tryDemo}
            </button>
          </nav>
        </header>

        {/* Main content */}
        <main className="kw-main">
          {/* Hero section */}
          <section className="kw-hero">
            <div className="kw-hero-left">
              <h1 className="kw-hero-title">
                {t.heroTitle}
              </h1>
              <p className="kw-hero-subtitle">
                {t.heroSubtitle}
              </p>
              <div className="kw-hero-actions">
                <button
                  type="button"
                  className="kw-btn kw-btn-primary"
                  onClick={() => navigate('/worker-onboard')}
                >
                  {t.startVoice}
                </button>
                <button
                  type="button"
                  className="kw-btn kw-btn-outline"
                  onClick={() => navigate('/worker-profile')}
                >
                  {t.viewProfile}
                </button>
              </div>
            </div>

            <div className="kw-hero-right">
              {/* Mini dashboard preview card */}
              <div className="kw-app-preview">
                <div className="kw-app-preview-header">
                  <div className="kw-app-preview-title">{t.dashboardTitle}</div>
                  <span className="kw-app-preview-badge">{t.workerView}</span>
                </div>

                <div className="kw-filters-row">
                  <div className="kw-filter-pill">{t.city}</div>
                  <div className="kw-filter-pill">{t.skill}</div>
                  <div className="kw-filter-pill">{t.experience}</div>
                </div>

                <div className="kw-workers-list">
                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">{t.yourProfile}</div>
                      <div className="kw-worker-meta">
                        {t.completeDetails}
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">{t.profile}</span>
                        <span className="kw-tag">{t.trustScore}</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-medium">
                      {t.inProgress}
                    </div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">{t.newOpportunities}</div>
                      <div className="kw-worker-meta">
                        {t.nearbyHomes}
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">{t.nearby}</span>
                        <span className="kw-tag">{t.active}</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-high">
                      {t.comingSoon}
                    </div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">{t.savedHomes}</div>
                      <div className="kw-worker-meta">
                        {t.likedHomes}
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">{t.repeatWork}</span>
                        <span className="kw-tag">{t.trusted}</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-high">
                      {t.zeroSaved}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real availability card */}
          <section className="kw-section">
            <div
              style={{
                maxWidth: 520,
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid #D1E7DD',
                padding: 20,
                boxShadow: '0 12px 30px rgba(10, 40, 25, 0.08)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 8, fontSize: 20, fontWeight: 800 }}>
                Your availability
              </h2>
              <p style={{ margin: 0, marginBottom: 12, fontSize: 13, color: '#6B7280' }}>
                Update whether you are currently hired or free for new work.
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: statusBg,
                  color: statusColor,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Status: {statusLabel}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>
                    Your phone number (same as emergency contact)
                  </label>
                  <input
                    name="workerPhone"
                    value={form.workerPhone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    style={{
                      height: 40,
                      borderRadius: 10,
                      border: '1px solid #D1E7DD',
                      padding: '0 10px',
                      fontSize: 14,
                    }}
                  />
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '6px 0 8px' }} />

                <div style={{ fontSize: 13, fontWeight: 700 }}>Mark myself as currently hired</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>
                  Fill this when you start working at a new household.
                </div>

                <input
                  name="employerName"
                  value={form.employerName}
                  onChange={handleChange}
                  placeholder="Employer name"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid #D1E7DD',
                    padding: '0 10px',
                    fontSize: 14,
                  }}
                />
                <input
                  name="employerPhone"
                  value={form.employerPhone}
                  onChange={handleChange}
                  placeholder="Employer phone (optional)"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid #D1E7DD',
                    padding: '0 10px',
                    fontSize: 14,
                  }}
                />
                <input
                  name="householdName"
                  value={form.householdName}
                  onChange={handleChange}
                  placeholder="Household name (optional)"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid #D1E7DD',
                    padding: '0 10px',
                    fontSize: 14,
                  }}
                />
                <input
                  type="date"
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                  style={{
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid #D1E7DD',
                    padding: '0 10px',
                    fontSize: 14,
                  }}
                />

                <button
                  type="button"
                  onClick={callSelfHire}
                  disabled={loading}
                  className="kw-btn kw-btn-primary"
                >
                  {loading ? 'Updating...' : 'Mark myself as hired at this household'}
                </button>

                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '10px 0' }} />

                <div style={{ fontSize: 13, fontWeight: 700 }}>Mark job done / I am free now</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>
                  Use this when you stop working at your current household.
                </div>

                <button
                  type="button"
                  onClick={callSelfRelease}
                  disabled={loading}
                  className="kw-btn kw-btn-outline"
                >
                  {loading ? 'Updating...' : 'Mark myself as available for new work'}
                </button>

                {message && (
                  <div style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>{message}</div>
                )}
              </div>
            </div>
          </section>

          {/* How it works section */}
          <section id="how-it-works" className="kw-section kw-how">
            <h2 className="kw-section-title">{t.howItWorks}</h2>
            <div className="kw-steps-row">
              <div className="kw-step-card">
                <div className="kw-step-number">1</div>
                <h3 className="kw-step-title">{t.step1Title}</h3>
                <p className="kw-step-text">
                  {t.step1Text}
                </p>
              </div>
              <div className="kw-step-card">
                <div className="kw-step-number">2</div>
                <h3 className="kw-step-title">{t.step2Title}</h3>
                <p className="kw-step-text">
                  {t.step2Text}
                </p>
              </div>
              <div className="kw-step-card">
                <div className="kw-step-number">3</div>
                <h3 className="kw-step-title">{t.step3Title}</h3>
                <p className="kw-step-text">
                  {t.step3Text}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default WorkerDashboard;