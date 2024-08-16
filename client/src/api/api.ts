// src/api/api.ts
import axios from 'axios';


console.log("Environment variables:", process.env);
console.log('API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
