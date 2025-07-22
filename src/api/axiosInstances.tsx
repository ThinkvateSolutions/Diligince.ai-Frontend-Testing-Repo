import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust if needed
  withCredentials: true, // To send cookies
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or custom headers if needed
    const token = localStorage.getItem("token"); // example
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access");
      // Optional: redirect to login page or show toast
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
