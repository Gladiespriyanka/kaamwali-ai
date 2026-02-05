// frontend/src/components/AuthPage.jsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AuthPage = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login');
  const [userType, setUserType] = useState('worker');

  const { language, setLanguage, messages, loadingTranslations } = useLanguage();

  const isWorker = userType === 'worker';
  const t = (messages && messages.auth) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAuthSuccess) {
      onAuthSuccess(userType);
    }
  };

  return (
    <>
      <style>{`
        .kw-auth-shell {
          display: flex;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .kw-auth-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #ffffff;
          position: relative;
        }

        .kw-auth-content {
          width: 100%;
          max-width: 480px;
        }

        .kw-language-selector-inline {
          margin-bottom: 20px;
          text-align: left;
        }

        .kw-language-dropdown {
          padding: 10px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 24px;
          background: white;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .kw-language-dropdown:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .kw-logo {
          display: inline-block;
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1.5px;
          border-radius: 28px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          margin-bottom: 40px;
        }

        .kw-heading {
          font-size: 36px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 32px;
          line-height: 1.2;
        }

        .kw-role-toggle {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .kw-role-btn {
          flex: 1;
          padding: 14px 24px;
          border: none;
          border-radius: 28px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          background: #f5f5f5;
          color: #666;
          transition: all 0.3s ease;
        }

        .kw-role-btn:hover {
          background: #ebebeb;
        }

        .kw-role-btn.kw-active {
          background: #1a1a2e;
          color: white;
          box-shadow: 0 4px 12px rgba(26, 26, 46, 0.25);
        }

        .kw-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 32px;
          border-bottom: 2px solid #f0f0f0;
        }

        .kw-tab {
          flex: 1;
          padding: 14px 0;
          border: none;
          background: none;
          font-size: 16px;
          font-weight: 500;
          color: #999;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }

        .kw-tab:hover {
          color: #666;
        }

        .kw-tab.kw-active {
          color: #1a1a2e;
        }

        .kw-tab.kw-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #1a1a2e;
        }

        .kw-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .kw-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kw-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .kw-input {
          padding: 16px 20px;
          border: 1px solid #e0e0e0;
          border-radius: 28px;
          font-size: 15px;
          outline: none;
          background: #fafafa;
          transition: all 0.2s ease;
        }

        .kw-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .kw-input::placeholder {
          color: #aaa;
        }

        .kw-forgot {
          text-align: right;
          margin-top: -8px;
        }

        .kw-forgot-link {
          background: none;
          border: none;
          color: #667eea;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
        }

        .kw-forgot-link:hover {
          text-decoration: underline;
        }

        .kw-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .kw-checkbox-row input[type="checkbox"] {
          margin-top: 3px;
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #1a1a2e;
        }

        .kw-checkbox-row label {
          font-size: 14px;
          color: #555;
          line-height: 1.5;
          cursor: pointer;
        }

        .kw-submit {
          padding: 18px;
          border: none;
          border-radius: 28px;
          background: #1a1a2e;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          box-shadow: 0 4px 12px rgba(26, 26, 46, 0.3);
          transition: all 0.3s ease;
        }

        .kw-submit:hover {
          background: #2d2d44;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(26, 26, 46, 0.4);
        }

        .kw-submit:active {
          transform: translateY(0);
        }

        .kw-auth-right {
          flex: 1;
          padding: 40px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kw-image-wrapper {
          width: 100%;
          height: 100%;
          max-width: 600px;
          max-height: 800px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .kw-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 968px) {
          .kw-auth-shell {
            flex-direction: column;
          }
          
          .kw-auth-right {
            display: none;
          }

          .kw-heading {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .kw-auth-left {
            padding: 20px;
          }

          .kw-role-btn {
            font-size: 14px;
            padding: 12px 16px;
          }

          .kw-logo {
            font-size: 14px;
            padding: 10px 24px;
          }
        }
      `}</style>
      
      <div className="kw-auth-shell">
        <div className="kw-auth-left">
          <div className="kw-auth-content">
            <div className="kw-logo">{t.logo}</div>

            <h1 className="kw-heading">
              {mode === 'login' ? t.welcomeBack : t.createAccount}
            </h1>

            <div className="kw-language-selector-inline">
              <select
                className="kw-language-dropdown"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="te">తెలుగు</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="mr">मराठी</option>
                <option value="bn">বাংলা</option>
              </select>
              {loadingTranslations && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#888' }}>
                  Loading language…
                </div>
              )}
            </div>

            <div className="kw-role-toggle">
              <button
                type="button"
                className={`kw-role-btn ${isWorker ? 'kw-active' : ''}`}
                onClick={() => setUserType('worker')}
              >
                {t.iAmWorker}
              </button>
              <button
                type="button"
                className={`kw-role-btn ${!isWorker ? 'kw-active' : ''}`}
                onClick={() => setUserType('employer')}
              >
                {t.iAmEmployer}
              </button>
            </div>

            <div className="kw-tabs">
              <button
                type="button"
                className={`kw-tab ${mode === 'login' ? 'kw-active' : ''}`}
                onClick={() => setMode('login')}
              >
                {t.login}
              </button>
              <button
                type="button"
                className={`kw-tab ${mode === 'signup' ? 'kw-active' : ''}`}
                onClick={() => setMode('signup')}
              >
                {t.signup}
              </button>
            </div>

            <form className="kw-form" onSubmit={handleSubmit}>
              {mode === 'login' ? (
                <>
                  <div className="kw-field">
                    <label className="kw-label">
                      {t.emailPhone}
                    </label>
                    <input
                      type="text"
                      className="kw-input"
                      placeholder={t.emailPhonePlaceholder}
                      required
                    />
                  </div>

                  <div className="kw-field">
                    <label className="kw-label">{t.password}</label>
                    <input
                      type="password"
                      className="kw-input"
                      placeholder={t.passwordPlaceholder}
                      required
                    />
                  </div>

                  <div className="kw-forgot">
                    <button type="button" className="kw-forgot-link">
                      {t.forgotPassword}
                    </button>
                  </div>

                  <button type="submit" className="kw-submit">
                    {t.loginButton}
                  </button>
                </>
              ) : (
                <>
                  {isWorker ? (
                    <>
                      <div className="kw-field">
                        <label className="kw-label">{t.name}</label>
                        <input
                          type="text"
                          className="kw-input"
                          placeholder={t.fullNamePlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">
                          {t.phoneNumber}
                        </label>
                        <input
                          type="tel"
                          className="kw-input"
                          placeholder={t.phonePlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">
                          {t.cityArea}
                        </label>
                        <input
                          type="text"
                          className="kw-input"
                          placeholder={t.cityAreaPlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">
                          {t.password}
                        </label>
                        <input
                          type="password"
                          className="kw-input"
                          placeholder={t.passwordMin}
                          required
                        />
                      </div>

                      <div className="kw-checkbox-row">
                        <input type="checkbox" id="worker-consent" required />
                        <label htmlFor="worker-consent">
                          {t.workerConsent}
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="kw-field">
                        <label className="kw-label">{t.name}</label>
                        <input
                          type="text"
                          className="kw-input"
                          placeholder={t.namePlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">{t.email}</label>
                        <input
                          type="email"
                          className="kw-input"
                          placeholder={t.emailPlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">{t.city}</label>
                        <input
                          type="text"
                          className="kw-input"
                          placeholder={t.cityPlaceholder}
                          required
                        />
                      </div>

                      <div className="kw-field">
                        <label className="kw-label">
                          {t.password}
                        </label>
                        <input
                          type="password"
                          className="kw-input"
                          placeholder={t.passwordMin}
                          required
                        />
                      </div>

                      <div className="kw-checkbox-row">
                        <input type="checkbox" id="employer-consent" required />
                        <label htmlFor="employer-consent">
                          {t.employerConsent}
                        </label>
                      </div>
                    </>
                  )}

                  <button type="submit" className="kw-submit">
                    {t.createAccountButton}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        <div className="kw-auth-right">
          <div className="kw-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="KaamWali.AI"
              className="kw-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
