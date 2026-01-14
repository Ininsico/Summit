import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with interceptors
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // If token is expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // window.location.href = '/auth'; // Optional: auto-redirect
        }
        return Promise.reject(error.response?.data || { message: 'Network Error' });
    }
);

export const authAPI = {
    register: (userData: any) => api.post('/auth/register', userData),
    login: (credentials: any) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
};

export const bookingAPI = {
    create: (bookingData: any) => api.post('/bookings', bookingData),
    getAll: () => api.get('/bookings'),
    getById: (id: string) => api.get(`/bookings/${id}`),
    cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
};

export default api;
