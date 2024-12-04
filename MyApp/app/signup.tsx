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
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Tracks the active input
  const buttonScale = new Animated.Value(1); // For button press animation

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
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Create an Account
      </Animatable.Text>

      {/* Username Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={[
          styles.inputContainer,
          activeInput === "username" && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="person" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onFocus={() => setActiveInput("username")}
          onBlur={() => setActiveInput(null)}
        />
      </Animatable.View>

      {/* Email Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={300}
        style={[
          styles.inputContainer,
          activeInput === "email" && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="email" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onFocus={() => setActiveInput("email")}
          onBlur={() => setActiveInput(null)}
        />
      </Animatable.View>

      {/* Password Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={400}
        style={[
          styles.inputContainer,
          activeInput === "password" && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          onFocus={() => setActiveInput("password")}
          onBlur={() => setActiveInput(null)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </Animatable.View>

      {/* Confirm Password Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={[
          styles.inputContainer,
          activeInput === "confirmPassword" && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirmPassword}
          onFocus={() => setActiveInput("confirmPassword")}
          onBlur={() => setActiveInput(null)}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <MaterialIcons
            name={showConfirmPassword ? "visibility" : "visibility-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </Animatable.View>

      {/* Signup Button */}
      <Animated.View
        style={[styles.signupButtonWrapper, { transform: [{ scale: buttonScale }] }]}
      >
        <TouchableOpacity
          style={styles.signupButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#4A90E2", "#007BFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signupGradient}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Already have an account? */}
      <Animatable.View
        animation="fadeInUp"
        delay={600}
        style={styles.loginContainer}
      >
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/loginpage")}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </Animatable.View>
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
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  activeInputContainer: {
    borderColor: "#000",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#333",
  },
  signupButtonWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  signupButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  signupGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    color: "#888",
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default SignupPage;
