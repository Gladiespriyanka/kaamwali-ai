import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://kaamwali-ai-backend.onrender.com';

export default function WorkersList() {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [filters, setFilters] = useState({
    cityArea: 'kurnool',
    minExp: '',
    maxSalary: '',
    skill: ''
  });

  const theme = {
    bg: '#f5f9f7',
    card: '#ffffff',
    primary: '#2E7D5E',
    primaryHover: '#235F48',
    text: '#162B22',
    secondary: '#6B7280',
    border: '#D1E7DD',
  };

  const fetchWorkers = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();

    if (filters.cityArea) {
      params.append('cityArea', filters.cityArea); // existing city filter
      params.append('q', filters.cityArea);        // NEW: free-text search on searchKey_en
    }

    if (filters.minExp) params.append('minExp', filters.minExp);
    if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
    if (filters.skill) params.append('skill', filters.skill);

    const url = `${API_BASE}/api/workers?${params.toString()}`;
console.log('WorkersList fetch URL:', url);
const res = await fetch(url);

    const data = await res.json();
    setWorkers(data.workers || []);
  } catch (err) {
    console.error('Error fetching workers', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers();
  };

  const handleViewResume = async (workerId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/workers/${workerId}/generate-pdf`,
        { method: 'POST' }
      );
      const data = await res.json();

      if (data.pdfUrl) {
        window.open(`${API_BASE}${data.pdfUrl}`, '_blank');
      } else {
        alert('Resume generation failed');
      }
    } catch (err) {
      console.error('Resume error:', err);
      alert('Error generating resume');
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #E5E7EB',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: 1140, margin: '0 auto', padding: '0 20px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div onClick={() => navigate('/employer-dashboard')} style={{
            fontSize: 20, fontWeight: 800, color: '#0F2F30', cursor: 'pointer', letterSpacing: '0.02em'
          }}>
            KaamWali<span style={{ color: '#2E7D5E' }}>.AI</span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              onClick={() => navigate('/employer-dashboard')}
              style={{
                border: 'none', background: 'transparent', color: '#2E7D5E',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '8px 12px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#1D5F47'}
              onMouseLeave={e => e.currentTarget.style.color = '#2E7D5E'}
            >
              For Employers
            </button>

            <button
              type="button"
              onClick={() => navigate('/feedback')}
              style={{
                background: '#2E7D5E', color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 20px', fontWeight: 700,
                fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 18px rgba(46,125,94,0.32)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#235F48'}
              onMouseLeave={e => e.currentTarget.style.background = '#2E7D5E'}
            >
              Feedback
            </button>
          </nav>
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 40 }}>
        <style>{`
          @keyframes flipCard {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(180deg); }
          }
          @keyframes flipCardBack {
            0% { transform: rotateY(180deg); }
            100% { transform: rotateY(0deg); }
          }
          .flip-container {
            perspective: 1000px;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .flip-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s ease;
            transform-style: preserve-3d;
          }
          .flip-inner.flipped {
            transform: rotateY(180deg);
          }
          .flip-front, .flip-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .flip-back {
            transform: rotateY(180deg);
          }
        `}</style>

        <div style={{ maxWidth: 1020, margin: '32px auto 0', padding: '0 16px' }}>
          <div style={{
            background: theme.card, border: `1px solid ${theme.border}`,
            borderRadius: 18, boxShadow: '0 12px 30px rgba(10, 40, 25, 0.08)',
            padding: 24, marginBottom: 24,
          }}>
            <h1 style={{
              margin: 0, color: theme.text, fontSize: 24, fontWeight: 800,
              marginBottom: 12,
            }}>
              KaamWali Profiles (For Employers)
            </h1>
            <p style={{ margin: 0, color: theme.secondary, fontSize: 14 }}>
              Filter qualified workers and find the right match quickly. Hover to flip and see more details.
            </p>

            <form
              onSubmit={handleSearch}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 14,
                marginTop: 20,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  City / Area
                </label>
                <input
                  name="cityArea"
                  value={filters.cityArea}
                  onChange={handleChange}
                  placeholder="Bhiwani"
                  style={{
                    height: 44, borderRadius: 12, border: `1px solid ${theme.border}`,
                    padding: '0 12px', fontSize: 14, color: theme.text,
                    outline: 'none', background: '#fff', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Skill
                </label>
                <input
                  name="skill"
                  value={filters.skill}
                  onChange={handleChange}
                  placeholder="Cooking"
                  style={{
                    height: 44, borderRadius: 12, border: `1px solid ${theme.border}`,
                    padding: '0 12px', fontSize: 14, color: theme.text,
                    outline: 'none', background: '#fff', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Min Experience (years)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minExp}
                  onChange={(e) => setFilters({ ...filters, minExp: e.target.value })}
                  style={{
                    height: 44, borderRadius: 12, border: `1px solid ${theme.border}`,
                    padding: '0 12px', fontSize: 14, color: theme.text,
                    outline: 'none', background: '#fff', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Max Salary
                </label>
                <input
                  type="number"
                  placeholder="Enter max"
                  value={filters.maxSalary}
                  onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                  style={{
                    height: 44, borderRadius: 12, border: `1px solid ${theme.border}`,
                    padding: '0 12px', fontSize: 14, color: theme.text,
                    outline: 'none', background: '#fff', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = theme.primary}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
                />
              </div>

              <button
                type="submit"
                style={{
                  gridColumn: '1 / -1', width: '100%', height: 48,
                  marginTop: 3, borderRadius: 12, border: 'none', background: theme.primary,
                  color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(46,125,94,0.25)', transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = theme.primaryHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Search workers
              </button>
            </form>
          </div>

          {loading && <p style={{ color: theme.secondary }}>Loading workers...</p>}

          {!loading && workers.length === 0 && (
            <p style={{ color: theme.secondary }}>No workers found yet. Ask a worker to create a profile first.</p>
          )}

          <div style={{ display: 'grid', gap: 14 }}>
            {workers.map((w) => (
              <div
                key={w._id}
                style={{
                  background: '#fff', borderRadius: 16, border: `1px solid ${theme.border}`,
                  boxShadow: '0 8px 18px rgba(17, 33, 20, 0.08)', 
                  minHeight: 130, position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="flip-container"
                  onMouseEnter={() => setFlipped({ ...flipped, [w._id]: true })}
                  onMouseLeave={() => setFlipped({ ...flipped, [w._id]: false })}
                  onClick={() => setFlipped({ ...flipped, [w._id]: !flipped[w._id] })}
                >
                  <div className={`flip-inner ${flipped[w._id] ? 'flipped' : ''}`}>
                    {/* ===== FRONT SIDE ===== */}
                    <div 
                      className="flip-front"
                      style={{
                        padding: 14,
                        background: '#fff',
                        borderRadius: 16,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: theme.text, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                          {w.name || 'Worker'}
                        </h2>
                        <p style={{ margin: '3px 0', color: theme.secondary, fontSize: 14, fontWeight: 500 }}>
                          📍 Location: {w.cityArea || 'Location not set'}
                        </p>
                        <p style={{ margin: '3px 0 0', color: theme.secondary, fontSize: 14, fontWeight: 500 }}>
                          ⏱️ Experience: {w.experienceYears != null ? `${w.experienceYears} yrs` : 'NA'}
                        </p>
                      </div>

                      <div style={{ 
                        marginTop: 8,
                        padding: '6px 10px',
                        background: '#F0F9F6',
                        borderRadius: 8,
                        fontSize: 11,
                        color: theme.primary,
                        fontWeight: 600,
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                      }}>
                        Hover to flip →
                      </div>
                    </div>

                    {/* ===== BACK SIDE ===== */}
                    <div 
                      className="flip-back"
                      style={{
                        padding: 14,
                        background: `linear-gradient(135deg, #f5f9f7 0%, #fff 100%)`,
                        borderRadius: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: '0 0 6px 0', color: theme.secondary, fontSize: 13, fontWeight: 500 }}>
                          <strong>Skills:</strong> {w.skills && w.skills.length ? w.skills.slice(0, 2).join(', ') : 'NA'}
                        </p>

                        <p style={{ margin: '0 0 8px 0', color: theme.secondary, fontSize: 13, fontWeight: 500 }}>
                          <strong>Expected Salary:</strong> ₹{w.expectedSalary ? w.expectedSalary : 'NA'}
                        </p>

                        <span style={{ 
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          padding: '4px 10px', borderRadius: 999, background: '#E6F4EE',
                          color: theme.primary, fontSize: 12, fontWeight: 700,
                          marginTop: 0,
                        }}>
                          ⭐ {w.trustScore != null ? w.trustScore : 'NA'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleViewResume(w._id)}
                        style={{
                          width: 'auto', marginTop: 2, marginLeft: 'auto',
                          border: 'none', background: theme.primary, color: '#fff',
                          borderRadius: 8, padding: '8px 16px', fontWeight: 700,
                          fontSize: 12, cursor: 'pointer', boxShadow: '0 4px 10px rgba(46,125,94,0.18)',
                          transition: 'background 0.2s ease, transform 0.2s ease',
                          flexShrink: 0,
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#235F48';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = theme.primary;
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        View Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}