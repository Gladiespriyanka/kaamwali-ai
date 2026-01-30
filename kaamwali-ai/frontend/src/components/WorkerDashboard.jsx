// src/components/WorkerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMetrics } from '../api';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

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
              {metrics.workersCount} women onboarded · {metrics.employersCount} homes reached
            </span>
          ) : (
            <span className="topbar-tagline">
              Voice‑first jobs for domestic workers
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
              My profile
            </button>
            <button
              type="button"
              className="kw-nav-link"
              onClick={() => navigate('/worker-onboard')}
            >
              Work opportunities
            </button>
            <button
              type="button"
              className="kw-nav-cta"
              onClick={() => navigate('/worker-onboard')}
            >
              Try demo
            </button>
          </nav>
        </header>

        {/* Main content */}
        <main className="kw-main">
          {/* Hero section */}
          <section className="kw-hero">
            <div className="kw-hero-left">
              <h1 className="kw-hero-title">
                Voice-first hiring for domestic workers
              </h1>
              <p className="kw-hero-subtitle">
                Keep your profile updated, improve your trust score, and discover better work opportunities in nearby areas.
              </p>
              <div className="kw-hero-actions">
                <button
                  type="button"
                  className="kw-btn kw-btn-primary"
                  onClick={() => navigate('/worker-onboard')}
                >
                  Start voice onboarding
                </button>
                <button
                  type="button"
                  className="kw-btn kw-btn-outline"
                  onClick={() => navigate('/worker-profile')}
                >
                  View my profile
                </button>
              </div>
            </div>

            <div className="kw-hero-right">
              {/* Mini dashboard preview card */}
              <div className="kw-app-preview">
                <div className="kw-app-preview-header">
                  <div className="kw-app-preview-title">KaamWali.AI dashboard</div>
                  <span className="kw-app-preview-badge">Worker view</span>
                </div>

                <div className="kw-filters-row">
                  <div className="kw-filter-pill">City</div>
                  <div className="kw-filter-pill">Skill</div>
                  <div className="kw-filter-pill">Experience</div>
                </div>

                <div className="kw-workers-list">
                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">Your profile</div>
                      <div className="kw-worker-meta">
                        Complete your details to get more calls
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Profile</span>
                        <span className="kw-tag">Trust score</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-medium">In progress</div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">New opportunities</div>
                      <div className="kw-worker-meta">
                        Homes nearby looking for help
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Nearby</span>
                        <span className="kw-tag">Active</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-high">Coming soon</div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">Saved homes</div>
                      <div className="kw-worker-meta">
                        Homes you liked or worked with
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Repeat work</span>
                        <span className="kw-tag">Trusted</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-high">0 saved</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it works section */}
          <section id="how-it-works" className="kw-section kw-how">
            <h2 className="kw-section-title">How KaamWali.AI works for you</h2>
            <div className="kw-steps-row">
              <div className="kw-step-card">
                <div className="kw-step-number">1</div>
                <h3 className="kw-step-title">Speak, don’t type</h3>
                <p className="kw-step-text">
                  You answer simple questions in your native language using your voice.
                  We capture your skills, schedule, and preferred areas in your own words.
                </p>
              </div>
              <div className="kw-step-card">
                <div className="kw-step-number">2</div>
                <h3 className="kw-step-title">Profile and trust score</h3>
                <p className="kw-step-text">
                  KaamWali.AI turns your answers into a clear profile with a growing trust score
                  based on completeness, verification, and activity.
                </p>
              </div>
              <div className="kw-step-card">
                <div className="kw-step-number">3</div>
                <h3 className="kw-step-title">Homes find you</h3>
                <p className="kw-step-text">
                  Nearby homes discover you by area and skills and contact you directly
                  for better, repeat work.
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
