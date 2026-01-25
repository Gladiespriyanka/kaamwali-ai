// frontend/src/components/WorkersList.jsx
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000'; // adjust if different

export default function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    cityArea: '',
    minExperience: '',
    maxSalary: '',
    skill: ''
  });

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.cityArea) params.append('cityArea', filters.cityArea);
      if (filters.minExperience) params.append('minExperience', filters.minExperience);
      if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
      if (filters.skill) params.append('skill', filters.skill);

      const res = await fetch(`${API_BASE}/api/workers?${params.toString()}`);
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

  return (
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
          name="minExperience"
          value={filters.minExperience}
          onChange={handleChange}
          placeholder="Min experience (years)"
          className="input"
        />
        <input
          name="maxSalary"
          value={filters.maxSalary}
          onChange={handleChange}
          placeholder="Max salary (per month)"
          className="input"
        />
        <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>
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
            key={w.id}
            className="card"
            style={{ padding: 16, borderRadius: 8, border: '1px solid #eee' }}
          >
            <h2 className="card-title" style={{ marginBottom: 4 }}>
              {w.name || 'Worker'}
            </h2>
            <p className="text-small" style={{ margin: 0 }}>
              {w.cityArea || 'Location not set'}
            </p>
            <p className="text-small" style={{ margin: '4px 0' }}>
              Experience: {w.experienceYears != null ? `${w.experienceYears} years` : 'NA'}
            </p>
            <p className="text-small" style={{ margin: '4px 0' }}>
              Skills: {w.skills && w.skills.length ? w.skills.join(', ') : 'NA'}
            </p>
            <p className="text-small" style={{ margin: '4px 0' }}>
              Expected salary:{' '}
              {w.expectedSalary ? `${w.expectedSalary.toLocaleString()} / month` : 'NA'}
            </p>
            <p className="text-small" style={{ margin: '4px 0' }}>
              Trust score: {w.trustScore != null ? w.trustScore : 'NA'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
