import axios from "axios";

// Use Render backend
const API_BASE_URL = "https://findme-l00y.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------- AUTH API -----------------
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  me: (token) =>
    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// ----------------- MISSING PERSONS API -----------------
export const missingPersonsAPI = {
  getAll: () => api.get("/missing-persons"),
  getById: (id) => api.get(`/missing-persons/${id}`),
  create: (data, token) =>
    api.post("/missing-persons", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  update: (id, data, token) =>
    api.put(`/missing-persons/${id}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  delete: (id, token) =>
    api.delete(`/missing-persons/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  getMyReports: (token) =>
    api.get("/missing-persons/mine", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  getRecent: () => api.get("/missing-persons/recent"),
  getByLocation: (city) => api.get(`/missing-persons/location/${encodeURIComponent(city)}`),
  getStats: () => api.get("/missing-persons/stats"),
};

// Health Check
export const healthCheck = () =>
  axios.get("https://findme-l00y.onrender.com/api/health");
