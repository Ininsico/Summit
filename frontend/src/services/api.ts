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
    updateProfile: (data: any) => api.put('/auth/profile', data),
    uploadAvatar: (formData: FormData) => api.post('/auth/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const bookingAPI = {
    create: (bookingData: any) => api.post('/bookings', bookingData),
    getAll: () => api.get('/bookings'),
    getById: (id: string) => api.get(`/bookings/${id}`),
    update: (id: string, data: any) => api.put(`/bookings/${id}`, data),
    cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
};

export const destinationAPI = {
    getAll: () => api.get('/destinations'),
    getById: (id: string) => api.get(`/destinations/${id}`),
};

export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getAllBookings: () => api.get('/admin/bookings'),
    updateBooking: (id: string, data: any) => api.put(`/admin/bookings/${id}`, data),
    getAllUsers: () => api.get('/admin/users'),
    deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
    deleteBooking: (id: string) => api.delete(`/admin/bookings/${id}`),
    getAllMessages: () => api.get('/admin/messages'),
    deleteMessage: (id: string) => api.delete(`/admin/messages/${id}`),
    replyToMessage: (id: string, reply: string) => api.patch(`/admin/messages/${id}/reply`, { reply }),

    // Destination Management
    createDestination: (data: any) => api.post('/admin/destinations', data),
    updateDestination: (id: string, data: any) => api.put(`/admin/destinations/${id}`, data),
    deleteDestination: (id: string) => api.delete(`/admin/destinations/${id}`),
};

export default api;
