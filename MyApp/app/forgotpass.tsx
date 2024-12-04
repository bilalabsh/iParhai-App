import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const buttonScale = new Animated.Value(1);

  // Button Animation
  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Forgot password?</Text>

      {/* Email Input */}
      <View
        style={[
          styles.inputContainer,
          activeInput && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="email" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setActiveInput(true)}
          onBlur={() => setActiveInput(false)}
        />
      </View>

      {/* Info Text */}
      <Text style={styles.infoText}>
        <Text style={{ color: "red" }}>* </Text>
        We will send you a message to set or reset your new password
      </Text>

      {/* Submit Button */}
      <Animated.View
        style={[styles.submitButtonWrapper, { transform: [{ scale: buttonScale }] }]}
      >
        <TouchableOpacity
          style={styles.submitButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            console.log("Email submitted:", email);
            // Add your email submission logic here
          }}
        >
          <LinearGradient
            colors={["#4A90E2", "#007BFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  activeInputContainer: {
    borderColor: "#007BFF",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#888",
    marginVertical: 15,
    textAlign: "center",
  },
  submitButtonWrapper: {
    width: "100%",
  },
  submitButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  submitGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordPage;
