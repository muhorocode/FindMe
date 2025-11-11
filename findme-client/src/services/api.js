import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Missing Persons API
export const missingPersonsAPI = {
  getAll: () => api.get('/missing'),
  getById: (id) => api.get(`/missing/${id}`),
  create: (data) => api.post('/missing', data),
  update: (id, data) => api.put(`/missing/${id}`, data),
  delete: (id) => api.delete(`/missing/${id}`),
};

// Health check
export const healthCheck = () => axios.get('http://localhost:5000/api/health');
