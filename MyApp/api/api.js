import axios from "axios";

const API_BASE_URL = "http://192.168.18.53:5000";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user/`, // Correct route
      userData,
      { timeout: 10000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.response) {
      console.error("Server responded with:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/user/login`,
      userData,
      {
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
