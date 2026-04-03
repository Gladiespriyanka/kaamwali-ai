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
<<<<<<< Updated upstream
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
=======
    <div style={{
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e6f4ee, #f5f9f7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>
  <form style={{
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    width: "600px"
  }} onSubmit={handleSubmit}>

    <h2 style={{
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "25px"
    }}>
      Find a trusted worker
    </h2>

    <div style={{ display: "flex", gap: "15px" }}>

      <select value={city} onChange={(e)=>setCity(e.target.value)}
        style={{ flex:1, padding:"12px", borderRadius:"10px" }}>
        <option>Bhiwani</option>
        <option>Delhi</option>
      </select>

      <select value={skill} onChange={(e)=>setSkill(e.target.value)}
        style={{ flex:1, padding:"12px", borderRadius:"10px" }}>
        <option>Cooking</option>
        <option>Cleaning</option>
        <option>Babysitting</option>
      </select>

    </div>

    <button type="submit" style={{
      marginTop: "20px",
      width: "100%",
      padding: "14px",
      background: "#2E7D5E",
      color: "white",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px"
    }}>
      Show matching workers
    </button>

  </form>
</div>
>>>>>>> Stashed changes
  );
};

export default EmployerSearch;

/* 🎨 STYLES — EXACT MATCH LIKE IMAGE */

const styles = {

  /* BACKGROUND (soft gradient like pic) */
  wrapper: {
    background: "linear-gradient(135deg, #e6f4ee, #f5f9f7)",
    padding: "60px 20px",
    display: "flex",
    justifyContent: "center"
  },

  /* CARD */
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "22px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "650px",
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  /* TITLE */
  title: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#162B22",
    textAlign: "center",
    marginBottom: "10px"
  },

  /* ROW */
  row: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  field: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  label: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500"
  },

  /* INPUT */
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    background: "#f9fafb",
    outline: "none"
  },

  /* BUTTON */
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "#2E7D5E",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 6px 20px rgba(46,125,94,0.3)"
  }
};