// components/EmployerMatches.jsx
import React from 'react';

const EmployerMatches = ({ workers, city }) => {
  return (
    <div className="card">
      <h2 className="card-title">Matches in {city}</h2>
      {workers.length === 0 && (
        <p className="text-small">No workers yet – try another skill.</p>
      )}
      {workers.map((w) => (
        <div key={w.id} className="match-row">
          <div>
            <p className="match-name">{w.name}</p>
            <p className="text-small">
              Skills: {w.skills.join(', ')} · {w.experienceYears} yrs
            </p>
            <p className="text-small">
              Trust Score: {w.trustScore} · Area: {w.area || 'N/A'}
            </p>
            <p className="text-small text-verified">
              Phone shared only after both sides accept
            </p>
          </div>
          <button className="btn-small btn-outline">Contact</button>
        </div>
      ))}
    </div>
  );
};

export default EmployerMatches;
