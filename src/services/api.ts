import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
};

export const companyAPI = {
  list: () => api.get('/companies'),
  create: (data: any) => api.post('/companies', data),
  update: (id: string, data: any) => api.put(`/companies/${id}`, data),
  delete: (id: string) => api.delete(`/companies/${id}`),
};

export const campaignAPI = {
  list: (companyId: string) => api.get(`/companies/${companyId}/campaigns`),
  get: (id: string) => api.get(`/campaigns/${id}`),
  create: (data: any) => api.post('/campaigns', data),
  update: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
};

export const analysisAPI = {
  run: (campaignId: string) => api.post(`/campaigns/${campaignId}/analysis`),
  get: (campaignId: string) => api.get(`/campaigns/${campaignId}/analysis`),
};

export const strategyAPI = {
  generate: (campaignId: string) => api.post(`/campaigns/${campaignId}/strategy`),
  get: (campaignId: string) => api.get(`/campaigns/${campaignId}/strategy`),
};

export const contentAPI = {
  generate: (campaignId: string, prompt?: string) => api.post(`/campaigns/${campaignId}/content`, { prompt }),
  get: (campaignId: string) => api.get(`/campaigns/${campaignId}/content`),
  regenerate: (campaignId: string, contentId: string, prompt: string) =>
    api.post(`/campaigns/${campaignId}/content/${contentId}/regenerate`, { prompt }),
};

export default api;
