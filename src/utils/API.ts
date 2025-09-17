// apiClient.ts
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your API base path via env variable
  withCredentials: true, // Sends cookies with every request
  timeout: 10000, // Optional: set a sensible timeout
});

// Optional: Interceptors for auth, error handling, etc.
API.interceptors.request.use(
  (config) => {
    // Example: Add authorization header if needed
    // const token = getAuthToken();
    // if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("error in api...........", error);
    return Promise.reject(error);
  }
);

export default API;
