import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend URL
  withCredentials: true, // Allow sending cookies
});

export default api;
