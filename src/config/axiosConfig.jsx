import axios from 'axios';
import { getCookie } from '../api/localStorage';

// ============================================================
// AXIOS INSTANCE CONFIGURATION
// ============================================================

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_QUINIELA,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ───────────────────────────────────
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getCookie('sesion');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      location.href = `/unauthorized`;
    } else if (status === 401) {
      localStorage.clear();
      location.href = `/expired`;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
