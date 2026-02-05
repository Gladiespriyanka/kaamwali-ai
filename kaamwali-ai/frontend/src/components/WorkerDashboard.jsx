// src/components/WorkerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMetrics } from '../api';
import { useLanguage } from '../contexts/LanguageContext';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

  const { messages } = useLanguage();
  const t = (messages && messages.workerDashboard) || {};

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Ratio bar (same as AppContent) */}
      <header className="topbar">
        <div className="topbar-logo">KaamWali.AI</div>
        <div className="topbar-right">
          {metrics ? (
            <span className="topbar-tagline">
              {metrics.workersCount} {/* keep number */}
              {' '}
              {t.taglineWorkersCount || 'women onboarded'}
              {' · '}
              {metrics.employersCount}
              {' '}
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