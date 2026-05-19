// src/services/api.js
// Axios instance with JWT auth interceptor

import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://resume-builder-backend-snp2.onrender.com/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor: attach JWT token ────────────────────────────────────
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: handle auth errors globally ───────────────────────
API.interceptors.response.use(
  (response) => response,
  (error) => {
  

    if (error.response?.status === 401) {
      // Token expired or invalid — log out
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ─── Auth Services ────────────────────────────────────────────────────────────
export const authService = {
  register: (data)  => API.post('/auth/register', data),
  login:    (data)  => API.post('/auth/login', data),
  getMe:    ()      => API.get('/auth/me'),
  update:   (data)  => API.put('/auth/update', data),
};

// ─── Resume Services ──────────────────────────────────────────────────────────
export const resumeService = {
  getAll:     ()         => API.get('/resumes'),
  getById:    (id)       => API.get(`/resumes/${id}`),
  create:     (data)     => API.post('/resumes', data),
  update:     (id, data) => API.put(`/resumes/${id}`, data),
  delete:     (id)       => API.delete(`/resumes/${id}`),
  duplicate:  (id)       => API.post(`/resumes/${id}/duplicate`),
};

export default API;
