import axios from "axios";

const API_BASE_URL = "http://192.168.18.53:5000";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/user`,
});

// Interceptors (optional) for automatic token inclusion
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data; // Return user profile data
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data; 
  } catch (error) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data; // Return registration data
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
