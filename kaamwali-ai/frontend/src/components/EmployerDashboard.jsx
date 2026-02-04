// src/components/EmployerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMetrics } from '../api';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getMetrics()
      .then(setMetrics)
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Ratio bar */}
      <header className="topbar">
        <div className="topbar-logo">KaamWali.AI</div>
        <div className="topbar-right">
          {metrics ? (
            <span className="topbar-tagline">
              {metrics.workersCount} women onboarded · {metrics.employersCount} homes reached
            </span>
          ) : (
            <span className="topbar-tagline">
              Voice-first hiring for homes
            </span>
          )}
        </div>
      </header>

      <div className="kw-page">
        {/* Top navigation bar */}
        <header className="kw-nav">
          <div className="kw-logo">KaamWali.AI</div>
          <nav className="kw-nav-links">
            <button
              type="button"
              className="kw-nav-link"
              onClick={() => navigate('/for-employers')}
            >
              For Employers
            </button>
            <button
  type="button"
  className="kw-nav-link"
  onClick={() => {
    document
      .getElementById('how-it-works')
      ?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  How it works
</button>
            <button
              type="button"
              className="kw-nav-cta"
              onClick={() => navigate('/feedback')}
            >
              FeedBack
            </button>
          </nav>
        </header>

        {/* Main content */}
        <main className="kw-main">
          {/* Hero section */}
          <section className="kw-hero">
            <div className="kw-hero-left">
              <h1 className="kw-hero-title">
                Find trusted domestic help near you
              </h1>
              <p className="kw-hero-subtitle">
                Start as an employer and explore verified domestic workers nearby using filters like city, skills, experience, and salary.
              </p>
              <div className="kw-hero-actions">
                <button
                  type="button"
                  className="kw-btn kw-btn-primary"
                  onClick={() => navigate('/for-employers')}
                >
                  For Employers
                </button>
                <button
                  type="button"
                  className="kw-btn kw-btn-outline"
                  onClick={() => navigate('/feedback')}
                >
                  Feedback
                </button>
              </div>
            </div>

            <div className="kw-hero-right">
              {/* Mini dashboard preview card */}
              <div className="kw-app-preview">
                <div className="kw-app-preview-header">
                  <div className="kw-app-preview-title">Employer dashboard</div>
                  <span className="kw-app-preview-badge">Employer view</span>
                </div>

                <div className="kw-filters-row">
                  <div className="kw-filter-pill">Work type</div>
                  <div className="kw-filter-pill">Timing</div>
                  <div className="kw-filter-pill">Budget</div>
                </div>

                <div className="kw-workers-list">
                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">Your home profile</div>
                      <div className="kw-worker-meta">
                        Complete details to get better matches
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Address</span>
                        <span className="kw-tag">Preferences</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-medium">In progress</div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">Active job posts</div>
                      <div className="kw-worker-meta">
                        Requirements you have posted
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Open</span>
                        <span className="kw-tag">Matched</span>
                      </div>
                    </div>
                    <div className="kw-trust-pill kw-trust-high">2 active</div>
                  </div>

                  <div className="kw-worker-row">
                    <div>
                      <div className="kw-worker-name">Saved workers</div>
                      <div className="kw-worker-meta">
                        Workers you hired or liked before
                      </div>
                      <div className="kw-worker-tags">
                        <span className="kw-tag">Trusted</span>
                        <span className="kw-tag">Hire again</span>
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
      <h3 className="kw-step-title">Start as an employer</h3>
      <p className="kw-step-text">
        Register as an employer and create your profile. Your details help us
        personalize worker recommendations for you.
      </p>
    </div>

    <div className="kw-step-card">
      <div className="kw-step-number">2</div>
      <h3 className="kw-step-title">Search verified workers</h3>
      <p className="kw-step-text">
        Search and filter workers by city, skills, area, maximum experience,
        and expected salary. View worker profiles and resumes easily.
      </p>
    </div>

    <div className="kw-step-card">
      <div className="kw-step-number">3</div>
      <h3 className="kw-step-title">Share feedback</h3>
      <p className="kw-step-text">
        Give feedback for workers you have hired to help build trust and
        improve the experience for future employers.
      </p>
    </div>
  </div>
</section>
        </main>
      </div>
    </>
  );
};

export default EmployerDashboard;
