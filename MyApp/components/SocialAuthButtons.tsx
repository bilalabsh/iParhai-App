import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "../styles/GlobalStyles";

const SocialAuthButtons = () => {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleText}>Continue with</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around", width: "60%" }}>
        <TouchableOpacity>
          <FontAwesome name="google" size={24} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="apple" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialAuthButtons;
