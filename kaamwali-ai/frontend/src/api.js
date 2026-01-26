// src/api.js

// Use Render backend URL in production, fallback to localhost for local dev
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://kaamwali-ai-backend.onrender.com";;

// Metrics (you can make this hit your backend or just stub it)
export async function getMetrics() {
  try {
    const res = await fetch(`${API_BASE}/api/workers`);
    const data = await res.json();
    return {
      workersCount: (data.workers || []).length,
      employersCount: 0,
    };
  } catch {
    return { workersCount: 0, employersCount: 0 };
  }
}

// Employer search: call GET /api/workers
export async function searchWorkers(city, skill) {
  const params = new URLSearchParams();
  if (city) params.append("cityArea", city);
  if (skill) params.append("skill", skill);

  const res = await fetch(`${API_BASE}/api/workers?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch workers");
  }
  const data = await res.json();
  return data.workers || [];
}

// Called when worker finishes onboarding
export async function completeWorkerProfile(sessionId) {
  const res = await fetch(`${API_BASE}/api/profile/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) {
    throw new Error("Failed to complete profile");
  }
  const data = await res.json();
  return data.worker;
}
