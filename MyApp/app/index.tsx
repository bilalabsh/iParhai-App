import React from "react";
import { View } from "react-native";
import SignupPage from "./signup";
import axios from "axios";
import GlobalStyles from "../styles/GlobalStyles";
import AppIntroScreen from "./intro1";

const Index = () => {
  const handleSignUp = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // You can add additional logic here if needed
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to sign up");
      throw new Error(err.response?.data?.message || "Failed to sign up");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <AppIntroScreen></AppIntroScreen>
    </View>
  );
};

export default Index;
