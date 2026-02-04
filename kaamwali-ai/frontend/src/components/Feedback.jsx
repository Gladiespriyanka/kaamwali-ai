import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({
    workQuality: 0,
    reliability: "",
    attentionToDetail: "",
    professionalism: "",
    skillCompetence: "",
    overallSatisfaction: "",
  });

  const [improvementSuggestions, setImprovementSuggestions] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [housekeeperName, setHousekeeperName] = useState("");
  const [housekeeperRole, setHousekeeperRole] = useState("");
  const [date, setDate] = useState("");

  const handleRatingChange = (question, value) => {
    setRatings((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      employerName,
      housekeeperName,
      housekeeperRole,
      date,
      ratings,
      improvementSuggestions,
    });
    alert("Feedback submitted successfully!");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      padding: "35px 45px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#111827",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
    inputBox: {
      display: "flex",
      flexDirection: "column",
      fontSize: "13px",
      color: "#333",
    },
    input: {
      marginTop: "6px",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "13px",
    },
    question: {
      marginBottom: "25px",
    },
    questionText: {
      fontSize: "14px",
      marginBottom: "10px",
      color: "#333",
    },
    options: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    numberButton: (active) => ({
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "2px solid #333",
      backgroundColor: active ? "#111827" : "#fff",
      color: active ? "#fff" : "#111827",
      cursor: "pointer",
      fontWeight: "bold",
    }),
    optionButton: (active) => ({
      padding: "8px 14px",
      borderRadius: "20px",
      border: "2px solid #333",
      backgroundColor: active ? "#111827" : "#fff",
      color: active ? "#fff" : "#111827",
      cursor: "pointer",
      fontSize: "13px",
    }),
    textarea: {
      width: "100%",
      height: "90px",
      padding: "10px",
      fontSize: "13px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    submit: {
      marginTop: "30px",
      backgroundColor: "#111827",
      color: "#fff",
      padding: "12px 40px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  const OptionButtons = ({ question, options }) => (
    <div style={styles.options}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          style={styles.optionButton(ratings[question] === opt)}
          onClick={() => handleRatingChange(question, opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="kw-nav">
        <div
          className="kw-logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/employer-dashboard")}
        >
          KaamWali.AI
        </div>

        <nav className="kw-nav-links">
          <button
            type="button"
            className="kw-nav-link"
            onClick={() => navigate("/employer-dashboard")}
          >
            For Employers
          </button>

          <button
            type="button"
            className="kw-nav-cta"
            onClick={() => navigate("/feedback")}
          >
            Feedback
          </button>
        </nav>
      </header>

      {/* ===== PAGE ===== */}
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Housekeeper Feedback</div>

          <div style={styles.grid}>
            <div style={styles.inputBox}>
              Employer Name
              <input
                style={styles.input}
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div style={styles.inputBox}>
              Date
              <input
                type="date"
                style={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div style={styles.inputBox}>
              Housekeeper Name
              <input
                style={styles.input}
                value={housekeeperName}
                onChange={(e) => setHousekeeperName(e.target.value)}
                placeholder="Enter housekeeper name"
              />
            </div>

            <div style={styles.inputBox}>
              Housekeeper Role
              <input
                style={styles.input}
                value={housekeeperRole}
                onChange={(e) => setHousekeeperRole(e.target.value)}
                placeholder="Cook / Cleaner / Helper"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.question}>
              <p style={styles.questionText}>
                How would you rate the overall quality of the housekeeper’s work?
              </p>
              <div style={styles.options}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    style={styles.numberButton(ratings.workQuality === n)}
                    onClick={() => handleRatingChange("workQuality", n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.question}>
              <p style={styles.questionText}>
                Was the housekeeper reliable and punctual?
              </p>
              <OptionButtons
                question="reliability"
                options={["Always", "Sometimes", "Rarely"]}
              />
            </div>

            <div style={styles.question}>
              <p style={styles.questionText}>
                How thorough is the housekeeper in cleaning and organizing?
              </p>
              <OptionButtons
                question="attentionToDetail"
                options={["Excellent", "Good", "Fair", "Poor"]}
              />
            </div>

            <div style={styles.question}>
              <p style={styles.questionText}>
                How satisfied are you overall?
              </p>
              <OptionButtons
                question="overallSatisfaction"
                options={[
                  "Very satisfied",
                  "Satisfied",
                  "Neutral",
                  "Unsatisfied",
                ]}
              />
            </div>

            <div style={styles.question}>
              <p style={styles.questionText}>Suggestions</p>
              <textarea
                style={styles.textarea}
                value={improvementSuggestions}
                onChange={(e) => setImprovementSuggestions(e.target.value)}
              />
            </div>

            <button type="submit" style={styles.submit}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
