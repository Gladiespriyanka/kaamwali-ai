// components/WorkerProfile.jsx
import React, { useState } from 'react';
import SharePoster from './SharePoster';

const WorkerProfile = ({ worker: initialWorker, onBack }) => {
  const [worker, setWorker] = useState(initialWorker);

  if (!worker) return null;

  const createdDate = worker.createdAt
    ? new Date(worker.createdAt).toLocaleDateString()
    : 'Today';

  const lastUpdated =
    worker.reliabilitySignals?.lastUpdated &&
    new Date(worker.reliabilitySignals.lastUpdated).toLocaleDateString();

 const generatePdf = async () => {
  if (!worker?._id) {
    alert("Worker ID missing");
    return;
  }

  const res = await fetch(
    `${API_BASE}/api/workers/${worker._id}/generate-pdf`,
    { method: "POST" }
  );

  if (!res.ok) {
    alert("PDF generation failed");
    return;
  }

  const data = await res.json();
  const url = `${API_BASE}${data.pdfUrl}`;

  // ✅ THIS PART WAS MISSING
  const link = document.createElement("a");
  link.href = url;
  link.download = `worker_${worker._id}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};




  return (
    <div className="grid-two">
      {/* LEFT: core profile */}
      <div className="card">
        <button className="link-small" onClick={onBack}>
          ← Record again
        </button>

        <div className="profile-header">
          {/* Profile photo / avatar */}
          <div className="profile-photo">
            {worker.photoUrl ? (
              <img src={worker.photoUrl} alt={worker.name} />
            ) : (
              <div className="profile-avatar-placeholder">
                {worker.name?.[0] || 'W'}
              </div>
            )}
          </div>

          <div>
            <h2 className="card-title">{worker.name}</h2>

            <p className="chip chip-trust">
              Trust Score
              <span className="chip-score">{worker.trustScore}</span>
              <span className="chip-text">/ 100</span>
            </p>

            <p className="text-small">
              <span className="badge-verified">Verified voice profile</span> ·
              Joined: {createdDate}
            </p>
            <p className="text-small">
                    Location: {worker.cityArea || 'Not specified'}
            </p>     
            <p className="text-small">
              Experience: {worker.experienceYears} years
            </p>
          </div>
        </div>

        {/* Voice introduction */}
        <div className="section">
          <p className="section-title">Voice Introduction</p>
          <p className="text-small">
            Language: Hindi · Tone: Polite · Duration: ~12 sec
          </p>
          {/* <p className="text-small">
            Employers can trust how she speaks, not just what is written.
          </p> */}
          {/* <button className="btn-small btn-outline" disabled>
            ▶ Play sample (demo)
          </button> */}
        </div>

        {/* AI Summary */}
        {/* <div className="section">
          <p className="section-title">AI Summary</p>
          <p className="bio-text">
            {worker.aiSummary ||
              'This worker has experience in daily household cleaning and basic cooking assistance, communicates politely, and is available for flexible work in her local area.'}
          </p>
        </div> */}

        {/* Experience proof */}
        <div className="section">
          <p className="section-title">Experience (Voice‑inferred)</p>
          <ul className="list">
            {(worker.experienceDetail || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="text-small subtle">
            Experience inferred from voice interview responses.
          </p>
        </div>

        {/* Skill depth */}
        <div className="section">
          <p className="section-title">Skills & Depth</p>
          <p className="text-small">
            Skills: {worker.skills?.join(', ') || 'Not specified'}
          </p>
          {worker.skillDepth?.housekeeping && (
            <>
              <p className="text-small">Housekeeping includes:</p>
              <ul className="list">
                {worker.skillDepth.housekeeping.map((s, i) => (
                  <li key={i}>✔ {s}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Availability intelligence */}
        <div className="section">
          <p className="section-title">Availability</p>
          <p className="text-small">
            Morning:{' '}
            {worker.availabilityDetail?.morning ? '✔' : '❌'} · Afternoon:{' '}
            {worker.availabilityDetail?.afternoon ? '✔' : '❌'} · Evening:{' '}
            {worker.availabilityDetail?.evening ? '✔' : '❌'}
          </p>
          <p className="text-small">
            Days: {worker.availabilityDetail?.days || 'Flexible'} · Emergency
            work: {worker.availabilityDetail?.emergency ? 'Yes' : 'No'}
          </p>
        </div>

        {/* Language & communication */}
        <div className="section">
          <p className="section-title">Languages & Communication</p>
          <ul className="list">
            <li>
              Hindi –{' '}
              {worker.languageProfile?.hindi ||
                'Fluent (voice verified)'}
            </li>
            <li>
              English –{' '}
              {worker.languageProfile?.english ||
                'Basic (self-declared)'}
            </li>
          </ul>
          <ul className="list">
            <li>✔ Understands instructions clearly</li>
            <li>✔ Speaks politely</li>
          </ul>
        </div>

        {/* Personality & reliability */}
        <div className="section">
          <p className="section-title">Personality Indicators</p>
          <ul className="list">
            {(worker.personalityIndicators || []).map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
          <p className="text-small subtle">
            Indicators inferred from voice tone and responses (not final
            judgments).
          </p>
        </div>

        {/* <div className="section">
          <p className="section-title">Reliability Signals</p>
          <ul className="list">
            <li>✔ Responds clearly</li>
            <li>✔ Completed voice onboarding</li>
            <li>
              Profile last updated:{' '}
              {lastUpdated || createdDate}
            </li>
          </ul>
        </div> */}

        {/* Trust Score guidance */}
        <div className="section">
          <p className="section-title">Improve Trust Score</p>
          <p className="text-small">
            Current: {worker.trustScore} / 100
          </p>
          {/* <ul className="list">
            <li>+10 – Add a clear profile photo</li>
            <li>+15 – Complete full voice interview</li>
            <li>+10 – Receive one positive review</li>
          </ul> */}
        </div>

        {/* Safety & emergency */}
        <div className="section">
          <p className="section-title">Safety & Preferences</p>
          <ul className="list">
            <li>
                 Emergency contact: {worker.emergencyContact ? 'Added' : 'Not added'}
            </li>
            <li>
              Comfortable working with families:{' '}
              {worker.safety?.worksWithFamilies ? 'Yes' : 'Yes'}
            </li>
            <li>
              Comfortable with pets:{' '}
              {worker.safety?.comfortableWithPets ? 'Yes' : 'No'}
            </li>
          </ul>
        </div>

        {/* Raw bio */}
        <div className="bio-box">
          <p className="bio-title">Full Voice Transcript</p>
          <p className="bio-text">{worker.bio}</p>
        </div>
      </div>
       {/* <button onClick={generatePdf}>
  Generate & Download PDF
</button> */}

      {/* RIGHT: Share block */}
      {worker && <SharePoster worker={worker} />}
    </div>
  );
};

export default WorkerProfile;
