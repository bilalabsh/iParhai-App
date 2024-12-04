import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient"; // Ensure expo-linear-gradient is installed

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Tracks the active input
  const buttonScale = new Animated.Value(1); // For button press animation
  const [hoveredSocial, setHoveredSocial] = useState(null); // Tracks hover state for social buttons

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
        Welcome Back!
      </Animatable.Text>

      {/* Username/Email Input */}
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
          placeholder="Username or Email"
          placeholderTextColor="#aaa"
          onFocus={() => setActiveInput("username")}
          onBlur={() => setActiveInput(null)}
        />
      </Animatable.View>

      {/* Password Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={300}
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

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push("/forgotpass")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Animated.View
        style={[styles.loginButtonWrapper, { transform: [{ scale: buttonScale }] }]}
      >
        <TouchableOpacity
          style={styles.loginButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["#4A90E2", "#007BFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginGradient}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Divider */}
      <Text style={styles.dividerText}>- OR Continue with -</Text>

      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        {["google", "apple", "facebook"].map((platform, index) => (
          <Animatable.View
            key={platform}
            animation="bounceIn"
            delay={400 + index * 100}
            style={[
              styles.socialButton,
              hoveredSocial === platform && styles.socialButtonHovered,
            ]}
          >
            <TouchableOpacity
              onPress={() => console.log(`${platform} login`)}
              onMouseEnter={() => setHoveredSocial(platform)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              {platform === "google" && (
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
                  }}
                  style={styles.socialIcon}
                />
              )}
              {platform === "apple" && (
                <FontAwesome name="apple" size={24} color="black" />
              )}
              {platform === "facebook" && (
                <FontAwesome name="facebook" size={24} color="#1877F2" />
              )}
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>

      {/* Sign Up */}
      <Animatable.View animation="fadeInUp" delay={700} style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Create An Account</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signUpLink}> Sign Up</Text>
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
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#007BFF",
    marginBottom: 20,
  },
  loginButtonWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  loginGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerText: {
    color: "#888",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  socialButtonHovered: {
    backgroundColor: "#f0f0f0",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: "#888",
  },
  signUpLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default LoginPage;
