import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', // The backend API prefix from your README
});

// Interceptor to add the auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;