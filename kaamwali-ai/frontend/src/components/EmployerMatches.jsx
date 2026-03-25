// components/EmployerMatches.jsx
import React from 'react';
import './styles.css';
const EmployerMatches = ({ workers, city }) => {
  const styles = {
   wrapper: {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '0 16px 32px',
  marginTop: '20px'   // ADD THIS
},
    card: {
      background: '#ffffff',
      borderRadius: '18px',
      padding: '28px',
      boxShadow: '0 12px 28px rgba(14, 34, 21, 0.12)',
      border: '1px solid rgba(46, 125, 94, 0.15)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 800,
      margin: '0 0 20px',
      color: '#162B22',
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px 24px',
      color: '#6b7280',
      fontSize: '15px',
    },
    workerRow: {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '20px',
  padding: '20px',
  borderBottom: '1px solid #e5e7eb',
  alignItems: 'center',
  borderRadius: '12px',   // ADD
},
    workerInfo: {},
    workerName: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#162B22',
      margin: '0 0 6px',
    },
    workerDetail: {
      fontSize: '13px',
      color: '#4a6356',
      margin: '4px 0',
      lineHeight: 1.5,
    },
    workerPhone: {
      fontSize: '12px',
      color: '#9ca3af',
      fontStyle: 'italic',
      marginTop: '8px',
    },
    contactBtn: {
      padding: '10px 18px',
      background: '#2E7D5E',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 10px rgba(46, 125, 94, 0.2)',
    },
    badge: {
      display: 'inline-block',
      background: '#e6f4ee',
      color: '#2E7D5E',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 600,
      marginRight: '6px',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Matches in {city}</h2>
        {workers.length === 0 && (
          <div style={styles.emptyState}>
            <p>No workers yet – try another skill or city.</p>
          </div>
        )}
        {workers.map((w) => (
          <div
            key={w.id}
            style={styles.workerRow}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f8faf7'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={styles.workerInfo}>
              <p style={styles.workerName}>{w.name}</p>
              <p style={styles.workerDetail}>
                <span style={styles.badge}>★ {w.trustScore}</span>
                {w.experienceYears} years · {w.area || 'N/A'}
              </p>
              <p style={styles.workerDetail}>
                <strong>Skills:</strong> {w.skills.join(', ')}
              </p>
              {w.expectedSalary && (
                <p style={styles.workerDetail}>
                  <strong>Expected:</strong> ₹{w.expectedSalary}/month
                </p>
              )}
              <p style={styles.workerPhone}>💬 Phone shared only after both sides accept</p>
            </div>
            <button
              style={styles.contactBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 14px rgba(46, 125, 94, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(46, 125, 94, 0.2)';
              }}
            >
              View Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerMatches;
