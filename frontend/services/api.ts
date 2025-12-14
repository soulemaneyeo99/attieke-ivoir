import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Simple token refresh handling could go here
        if (error.response?.status === 401) {
            // Handle logout if needed
            localStorage.removeItem('accessToken');
        }
        return Promise.reject(error);
    }
);


export default api;
