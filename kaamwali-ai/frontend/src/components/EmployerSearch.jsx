// components/EmployerSearch.jsx
import React, { useState } from 'react';

const EmployerSearch = ({ onSearch }) => {
  const [city, setCity] = useState('Bhiwani');
  const [skill, setSkill] = useState('cooking');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city, skill);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 className="card-title">Find a trusted worker</h2>
      <label className="field">
        <span>City</span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        >
          <option value="Bhiwani">Bhiwani</option>
          <option value="Delhi">Delhi</option>
        </select>
      </label>

      <label className="field">
        <span>Required skill</span>
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="input"
        >
          <option value="cooking">Cooking</option>
          <option value="cleaning">Cleaning</option>
          <option value="babysitting">Babysitting</option>
        </select>
      </label>

      <button type="submit" className="btn">
        Show matching workers
      </button>
    </form>
  );
};

export default EmployerSearch;
