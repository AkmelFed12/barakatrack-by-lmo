const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("bt_token");
}

export function setAuth(token: string, user: { id: string; email: string; name?: string | null }) {
  localStorage.setItem("bt_token", token);
  localStorage.setItem("bt_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("bt_token");
  localStorage.removeItem("bt_user");
}

export function getUser() {
  const raw = localStorage.getItem("bt_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { id: string; email: string; name?: string | null };
  } catch {
    return null;
  }
}

export async function apiGet(path: string) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return res.json();
}

export async function apiPost(path: string, body: unknown) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  return res.json();
}
