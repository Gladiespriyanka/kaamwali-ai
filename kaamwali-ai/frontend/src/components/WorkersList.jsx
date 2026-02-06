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
  const [filters, setFilters] = useState({
    cityArea: 'kurnool',
    minExp: '',
    maxSalary: '',
    skill: ''
  });

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
      <header className="kw-nav">
  <div
    className="kw-logo"
    style={{ cursor: 'pointer' }}
    onClick={() => navigate('/employer-dashboard')}
  >
    KaamWali.AI
  </div>

  <nav className="kw-nav-links">
    <button
      type="button"
      className="kw-nav-link"
      onClick={() => navigate('/employer-dashboard')}
    >
      For Employers
    </button>

    <button
      type="button"
      className="kw-nav-link"
      onClick={() =>
        document
          .getElementById('how-it-works')
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    >
      How it works
    </button>

    <button
  type="button"
  className="kw-nav-cta"
  onClick={() => navigate('/feedback')}
>
  Feedback
</button>
  </nav>
</header>

      {/* ===== PAGE CONTENT ===== */}
      <div className="container" style={{ maxWidth: 800, margin: '32px auto' }}>
        <h1 className="text-large" style={{ marginBottom: 16 }}>
          KaamWali Profiles (For Employers)
        </h1>

        <form
          onSubmit={handleSearch}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 12,
            marginBottom: 20
          }}
        >
          <input
            name="cityArea"
            value={filters.cityArea}
            onChange={handleChange}
            placeholder="City / Area (e.g. Bhiwani)"
            className="input"
          />
          <input
            name="skill"
            value={filters.skill}
            onChange={handleChange}
            placeholder="Skill (e.g. cooking)"
            className="input"
          />
          <input
            type="number"
            placeholder="Min experience"
            value={filters.minExp}
            onChange={(e) =>
              setFilters({ ...filters, minExp: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max salary"
            value={filters.maxSalary}
            onChange={(e) =>
              setFilters({ ...filters, maxSalary: e.target.value })
            }
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ gridColumn: '1 / -1' }}
          >
            Search
          </button>
        </form>

        {loading && <p>Loading workers...</p>}

        {!loading && workers.length === 0 && (
          <p>No workers found yet. Ask a worker to create a profile first.</p>
        )}

        <div style={{ display: 'grid', gap: 16 }}>
          {workers.map((w) => (
            <div
              key={w._id}
              className="card"
              style={{
                padding: 16,
                borderRadius: 8,
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h2 className="card-title" style={{ marginBottom: 4 }}>
                  {w.name || 'Worker'}
                </h2>
                <p className="text-small" style={{ margin: 0 }}>
                  {w.cityArea || 'Location not set'}
                </p>
                <p className="text-small" style={{ margin: '4px 0' }}>
                  Experience:{' '}
                  {w.experienceYears != null ? `${w.experienceYears} years` : 'NA'}
                </p>
                <p className="text-small" style={{ margin: '4px 0' }}>
                  Skills:{' '}
                  {w.skills && w.skills.length ? w.skills.join(', ') : 'NA'}
                </p>
                <p className="text-small" style={{ margin: '4px 0' }}>
                  Expected salary:{' '}
                  {w.expectedSalary ? `${w.expectedSalary} / month` : 'NA'}
                </p>
                <p className="text-small" style={{ margin: '4px 0' }}>
                  Trust score: {w.trustScore != null ? w.trustScore : 'NA'}
                </p>
              </div>

              <button
                className="btn btn-outline"
                onClick={() => handleViewResume(w._id)}
              >
                View Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}