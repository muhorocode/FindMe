import axios from 'axios';

const API_BASE_URL = 'https://findme-l00y.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Missing Persons API
export const missingPersonsAPI = {
  getAll: () => api.get('/missing-persons'),
  getById: (id) => api.get(`/missing-persons/${id}`),
  create: (data) => api.post('/missing-persons', data),
  update: (id, data) => api.put(`/missing-persons/${id}`, data),
  delete: (id) => api.delete(`/missing-persons/${id}`),
};

// Health check
export const healthCheck = () => axios.get('https://findme-l00y.onrender.com/api/health');
