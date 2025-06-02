import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Handle common errors globally
    if (error.response) {
      // Only redirect to login on unauthorized (401) errors
      if (error.response.status === 401) {
        console.error("Authentication failed. Redirecting to login.");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      } else if (error.response.status === 404) {
        console.error("Resource not found.");
      } else {
        console.error(`API Error: ${error.response.status}`, error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else {
      console.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
