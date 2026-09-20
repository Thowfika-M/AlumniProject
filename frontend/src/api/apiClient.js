import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://alumniproject-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('alumni_connect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on unauthorized if unauthenticated
      localStorage.removeItem('alumni_connect_token');
      localStorage.removeItem('alumni_connect_user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
