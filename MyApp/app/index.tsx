import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const App = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Profile:", response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data?.message || error.message
      );
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);

  return null; // The app handles redirection here
};

export default App;
