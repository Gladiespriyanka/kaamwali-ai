// components/SharePoster.jsx
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const SharePoster = ({ worker }) => {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    const profileUrl = `${window.location.origin}/worker/${worker.id}`;
    QRCode.toDataURL(profileUrl).then(setQrDataUrl);
  }, [worker.id]);

  const profileUrl = `${window.location.origin}/worker/${worker.id}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `KaamWali.AI profile: ${worker.name}, skills: ${worker.skills.join(
      ', '
    )}. ${profileUrl}`
  )}`;

  return (
    <div className="card">
      <h2 className="card-title">Share profile</h2>
      {qrDataUrl && (
        <img src={qrDataUrl} alt="QR" className="qr" />
      )}
      <p className="text-small">
        Scan to view profile or tap below to share on WhatsApp.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-whatsapp"
      >
        Share on WhatsApp
      </a>
    </div>
  );
};

export default SharePoster;
