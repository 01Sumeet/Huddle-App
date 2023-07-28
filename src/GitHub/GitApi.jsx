// axiosInstance.js

import axios from "axios";

const API_BASE_URL = "https://64c35b41eb7fd5d6ebd0c3db.mockapi.io/"; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any global configurations for the request here
    // For example, adding authentication headers
    // config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify and process response data before it's used by the application
    return response.data;
  },
  (error) => {
    // Handle response error
    // You can handle specific error codes or error responses here
    return Promise.reject(error);
  }
);

export default axiosInstance;
