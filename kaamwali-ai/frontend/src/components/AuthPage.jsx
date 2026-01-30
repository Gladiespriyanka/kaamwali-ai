import React, { useState } from 'react';
import kaamwaliImage from '../assets/images/kaamwali-image.jpg'; // Corrected path from src/components/

const AuthPage = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [userType, setUserType] = useState('worker'); // 'worker' | 'employer'
  const isWorker = userType === 'worker';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAuthSuccess) {
      // IMPORTANT: tell parent whether it's worker or employer
      onAuthSuccess(userType);
    }
  };

  return (
    <div className="kw-auth-shell">
      {/* Left side: form */}
      <div className="kw-auth-left">
        <div className="kw-auth-left-inner">
          {/* Logo */}
          <div className="kw-auth-logo-row">
            <div className="kw-auth-logo-text">KaamWali.AI</div>
          </div>

          {/* Header */}
          <header className="kw-auth-heading">
            <h1 className="kw-auth-title">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h1>
          </header>

          {/* User type toggle */}
          <div className="kw-auth-toggle">
            <button
              type="button"
              className={
                'kw-auth-toggle-pill' +
                (isWorker ? ' kw-auth-toggle-pill-active' : '')
              }
              onClick={() => setUserType('worker')}
            >
              I am a worker
            </button>
            <button
              type="button"
              className={
                'kw-auth-toggle-pill' +
                (!isWorker ? ' kw-auth-toggle-pill-active' : '')
              }
              onClick={() => setUserType('employer')}
            >
              I am an employer
            </button>
          </div>

          {/* Tabs */}
          <div className="kw-auth-tabs-row">
            <button
              type="button"
              className={
                'kw-auth-tab-btn' +
                (mode === 'login' ? ' kw-auth-tab-btn-active' : '')
              }
              onClick={() => setMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={
                'kw-auth-tab-btn' +
                (mode === 'signup' ? ' kw-auth-tab-btn-active' : '')
              }
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form className="kw-auth-form-2col" onSubmit={handleSubmit}>
            {mode === 'login' ? (
              <>
                <div className="kw-auth-field">
                  <label className="kw-auth-label">Email / Phone</label>
                  <input
                    type="text"
                    className="kw-auth-input-pill"
                    placeholder="Enter your email or phone"
                    required
                  />
                </div>

                {/* LOGIN PASSWORD */}
                <div className="kw-auth-field">
                  <label className="kw-auth-label">Password</label>
                  <input
                    type="password"
                    className="kw-auth-input-pill"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="kw-auth-forgot-row">
                  <button type="button" className="kw-auth-forgot-link">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="kw-auth-submit-pill">
                  Log in
                </button>
              </>
            ) : (
              <>
                {isWorker ? (
                  <>
                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Name</label>
                      <input
                        type="text"
                        className="kw-auth-input-pill"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Phone number</label>
                      <input
                        type="tel"
                        className="kw-auth-input-pill"
                        placeholder="+91 98XXXXXXX"
                        required
                      />
                    </div>

                    <div className="kw-auth-field">
                      <label className="kw-auth-label">City / Area</label>
                      <input
                        type="text"
                        className="kw-auth-input-pill"
                        placeholder="e.g. Saket, South Delhi"
                        required
                      />
                    </div>

                    {/* WORKER SIGNUP PASSWORD */}
                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Password</label>
                      <input
                        type="password"
                        className="kw-auth-input-pill"
                        placeholder="Minimum 6 characters"
                        required
                      />
                    </div>

                    <div className="kw-auth-checkbox-row">
                      <input type="checkbox" id="worker-consent" required />
                      <label htmlFor="worker-consent">
                        I agree to share my profile with verified homes.
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Name</label>
                      <input
                        type="text"
                        className="kw-auth-input-pill"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Email</label>
                      <input
                        type="email"
                        className="kw-auth-input-pill"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="kw-auth-field">
                      <label className="kw-auth-label">City</label>
                      <input
                        type="text"
                        className="kw-auth-input-pill"
                        placeholder="e.g. Gurugram"
                        required
                      />
                    </div>

                    {/* EMPLOYER SIGNUP PASSWORD */}
                    <div className="kw-auth-field">
                      <label className="kw-auth-label">Password</label>
                      <input
                        type="password"
                        className="kw-auth-input-pill"
                        placeholder="Minimum 6 characters"
                        required
                      />
                    </div>

                    <div className="kw-auth-checkbox-row">
                      <input type="checkbox" id="employer-consent" required />
                      <label htmlFor="employer-consent">
                        I agree to contact workers respectfully and fairly.
                      </label>
                    </div>
                  </>
                )}

                <button type="submit" className="kw-auth-submit-pill">
                  Create account
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Right side image - FIXED */}
      <div className="kw-auth-right">
        <img
          src={kaamwaliImage}
          alt="KaamWali.AI illustration"
          className="kw-auth-right-image"
        />
      </div>
    </div>
  );
};

export default AuthPage;
