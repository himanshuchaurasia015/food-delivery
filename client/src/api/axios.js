import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
  withCredentials: true, // Allow sending cookies
});

export default api;
