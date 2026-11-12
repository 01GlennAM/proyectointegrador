import axios from 'axios';

// Se crea la instancia única de Axios usando la variable de entorno
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000
});

// Se configura el interceptor único para adjuntar el token automáticamente en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token_acceso');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;