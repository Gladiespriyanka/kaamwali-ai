// components/Landing.jsx
import React from 'react';

const Landing = ({ onWorkerClick, onEmployerClick }) => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          KaamWali.AI – <span>Her Voice, Her Work</span>
        </h1>
        <p className="hero-sub">
          Voice‑first platform for domestic workers. She speaks in Hindi, we
          create a professional profile, trust score, and connect her to safe
          jobs nearby.
        </p>
        <div className="hero-actions">
          <button className="btn hero-btn" onClick={onWorkerClick}>
            I am a Worker
          </button>
          <button className="btn btn-outline hero-btn" onClick={onEmployerClick}>
            I need a Worker
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
