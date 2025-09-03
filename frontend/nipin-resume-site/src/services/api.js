// src/services/api.js

// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const API_BASE =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:8000'
        : window.location.origin;

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/api/profile/`);
  if (!res.ok) throw new Error('Failed to load profile info');
  return res.json();
}

export const fetchSkills = async () => {
  const res = await fetch(`${API_BASE}/api/skills/`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
};

export const fetchEducation = async () => {
  const res = await fetch(`${API_BASE}/api/education/`);
  if (!res.ok) throw new Error("Failed to fetch education data");
  const data = await res.json();
  // If paginated, return results; else, return as-is
  return Array.isArray(data) ? data : data.results;
};

export const fetchCertifications = async () => {
  const res = await fetch(`${API_BASE}/api/certifications/`);
  if (!res.ok) throw new Error("Failed to fetch certification data");
  return res.json();
};

export const fetchLanguages = async () => {
  const res = await fetch(`${API_BASE}/api/languages/`);
  if (!res.ok) throw new Error("Failed to fetch language data");
  return res.json();
};

export const fetchExperience = async () => {
  const res = await fetch(`${API_BASE}/api/experience/`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
};

export async function sendResumeEmail(email) {
  return await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-resume/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
}

export async function sendContactMessage(formData) {
  const res = await fetch(`${API_BASE}/api/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to send message');
  }

  return res.json();
}