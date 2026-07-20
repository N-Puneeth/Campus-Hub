import axios from 'axios';

// Replace 5000 with your actual backend port
const API_URL = 'https://campus-hub-6t52.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;