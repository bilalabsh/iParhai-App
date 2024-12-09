import React, { useState } from "react";
import { View } from "react-native"; // Adjust path if needed
import axios from "axios";
import GlobalStyles from "../styles/GlobalStyles";
import AppIntroScreen from "./intro1";
import SignupPage from "./signup";

const Index = () => {
  const [showSignup, setShowSignup] = useState(false); // Toggle between Intro and Signup

  return (
    <View style={GlobalStyles.container}>
      {showSignup ? (
        <SignupPage /> // Render SignupPage component
      ) : (
        <AppIntroScreen onFinish={() => setShowSignup(true)} />
      )}
    </View>
  );
};



export default Index;
