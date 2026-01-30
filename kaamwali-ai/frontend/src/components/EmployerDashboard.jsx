// src/components/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = ({ onWorkerClick, onEmployerClick }) => {
  const navigate = useNavigate();

  return (
    <div className="kw-page">
      {/* Top navigation bar */}
      <header className="kw-nav">
        <div className="kw-logo">KaamWali.AI</div>
        <nav className="kw-nav-links">
          <button
            type="button"
            className="kw-nav-link"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How it works
          </button>
          <button
            type="button"
            className="kw-nav-link"
            onClick={onWorkerClick}
          >
            For Workers
          </button>
          <button
            type="button"
            className="kw-nav-link"
            onClick={onEmployerClick}
          >
            For Employers
          </button>
          <button
            type="button"
            className="kw-nav-cta"
            onClick={onWorkerClick}
          >
            Try demo
          </button>
          <button
            type="button"
            className="kw-nav-link"
            onClick={() => navigate('/auth')}
          >
            Log in / Sign up
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="kw-main">
        {/* Hero section */}
        <section className="kw-hero">
          <div className="kw-hero-left">
            <h1 className="kw-hero-title">
              Voice‑first hiring for domestic workers
            </h1>
            <p className="kw-hero-subtitle">
              Workers speak in Hindi or English to create a clear, reusable profile.
              Employers discover them by area, skills, and experience in just a few clicks.
            </p>
            <div className="kw-hero-actions">
              <button
                type="button"
                className="kw-btn kw-btn-primary"
                onClick={onWorkerClick}
              >
                Start as a worker
              </button>
              <button
                type="button"
                className="kw-btn kw-btn-outline"
                onClick={onEmployerClick}
              >
                Find a worker
              </button>
            </div>
          </div>

          <div className="kw-hero-right">
            {/* Mini dashboard preview card */}
            <div className="kw-app-preview">
              <div className="kw-app-preview-header">
                <div className="kw-app-preview-title">KaamWali.AI dashboard</div>
                <span className="kw-app-preview-badge">Demo view</span>
              </div>

              <div className="kw-filters-row">
                <div className="kw-filter-pill">City</div>
                <div className="kw-filter-pill">Skill</div>
                <div className="kw-filter-pill">Experience</div>
              </div>

              <div className="kw-workers-list">
                <div className="kw-worker-row">
                  <div>
                    <div className="kw-worker-name">Sunita Devi</div>
                    <div className="kw-worker-meta">Saket, South Delhi · 5+ yrs</div>
                    <div className="kw-worker-tags">
                      <span className="kw-tag">Cooking</span>
                      <span className="kw-tag">Cleaning</span>
                    </div>
                  </div>
                  <div className="kw-trust-pill kw-trust-high">Trust 88</div>
                </div>

                <div className="kw-worker-row">
                  <div>
                    <div className="kw-worker-name">Rekha</div>
                    <div className="kw-worker-meta">Noida Sector 62 · 3 yrs</div>
                    <div className="kw-worker-tags">
                      <span className="kw-tag">Childcare</span>
                      <span className="kw-tag">Cleaning</span>
                    </div>
                  </div>
                  <div className="kw-trust-pill kw-trust-medium">Trust 72</div>
                </div>

                <div className="kw-worker-row">
                  <div>
                    <div className="kw-worker-name">Shanti</div>
                    <div className="kw-worker-meta">Gurugram · 8+ yrs</div>
                    <div className="kw-worker-tags">
                      <span className="kw-tag">Full‑time</span>
                      <span className="kw-tag">Cooking</span>
                    </div>
                  </div>
                  <div className="kw-trust-pill kw-trust-high">Trust 91</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section id="how-it-works" className="kw-section kw-how">
          <h2 className="kw-section-title">How KaamWali.AI works</h2>
          <div className="kw-steps-row">
            <div className="kw-step-card">
              <div className="kw-step-number">1</div>
              <h3 className="kw-step-title">Worker speaks, not types</h3>
              <p className="kw-step-text">
                She answers a guided set of questions in Hindi or English.
                We capture her skills, schedule, and preferred areas in her own words.
              </p>
            </div>
            <div className="kw-step-card">
              <div className="kw-step-number">2</div>
              <h3 className="kw-step-title">Profile and trust score</h3>
              <p className="kw-step-text">
                KaamWali.AI turns her answers into a structured profile with a transparent
                trust score based on completeness, verification, and activity.
              </p>
            </div>
            <div className="kw-step-card">
              <div className="kw-step-number">3</div>
              <h3 className="kw-step-title">Homes find the right match</h3>
              <p className="kw-step-text">
                Employers filter by city, skills, and experience to discover nearby workers,
                then contact them directly for safe, repeat work.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
