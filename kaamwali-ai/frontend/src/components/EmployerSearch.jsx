// components/EmployerSearch.jsx
import React, { useState } from 'react';
import './styles.css';
const EmployerSearch = ({ onSearch }) => {
  const [city, setCity] = useState('Bhiwani');
  const [skill, setSkill] = useState('cooking');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city, skill);
  };

  const styles = {
    wrapper: {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '24px 16px',
  background: '#f5f9f7',   // ADD THIS
  minHeight: '100vh'       // ADD THIS
},
    
    title: {
      fontSize: '26px',
      fontWeight: 800,
      margin: '0 0 8px',
      color: '#162B22',
    },
    subtitle: {
      fontSize: '14px',
      color: '#4a6356',
      margin: '0 0 24px',
    },
    card: {
  background: '#ffffff',
  borderRadius: '18px',
  padding: '28px',
  boxShadow: '0 12px 28px rgba(14, 34, 21, 0.12)',
  border: '1px solid rgba(46, 125, 94, 0.15)',
},
    fieldsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '14px',
      marginBottom: '20px',
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '13px',
      fontWeight: 700,
      color: '#162B22',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    select: {
      padding: '12px 12px',
      borderRadius: '12px',
      border: '1.5px solid #d4e8df',
      background: '#fff',
      color: '#162B22',
      fontSize: '14px',
      fontWeight: 500,
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '14px 18px',
      background: '#2E7D5E',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease',
      boxShadow: '0 6px 16px rgba(46, 125, 94, 0.28)',
    },
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Find a trusted worker</h2>
        <p style={styles.subtitle}>Search by city and skill to see available matches</p>

        <div style={styles.fieldsGrid}>
          <label style={styles.field}>
            <span style={styles.label}>City</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = '#2E7D5E'}
              onBlur={(e) => e.target.style.borderColor = '#d4e8df'}
            >
              <option value="Bhiwani">Bhiwani</option>
              <option value="Delhi">Delhi</option>
            </select>
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Required skill</span>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = '#2E7D5E'}
              onBlur={(e) => e.target.style.borderColor = '#d4e8df'}
            >
              <option value="cooking">Cooking</option>
              <option value="cleaning">Cleaning</option>
              <option value="babysitting">Babysitting</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 24px rgba(46, 125, 94, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 16px rgba(46, 125, 94, 0.28)';
          }}
        >
          Show matching workers
        </button>
      </form>
    </div>
  );
};

export default EmployerSearch;
