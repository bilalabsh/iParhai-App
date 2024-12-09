import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios"; // Make sure axios is imported

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const buttonScale = new Animated.Value(1);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
      });
      console.log("User registered:", response.data);
      // Additional success logic (e.g., navigate to another screen)
      router.push("/loginpage"); // Navigate to the login page after successful signup
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to sign up");
      setError(err.response?.data?.message || "Failed to sign up");
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await handleSignUp(name, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

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
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Create an Account
      </Animatable.Text>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Username Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={styles.inputContainer}
      >
        <MaterialIcons name="person" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={name}
          onChangeText={setName}
        />
      </Animatable.View>

      {/* Email Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={300}
        style={styles.inputContainer}
      >
        <MaterialIcons name="email" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Animatable.View>

      {/* Password Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={400}
        style={styles.inputContainer}
      >
        <MaterialIcons name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
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
        style={styles.inputContainer}
      >
        <MaterialIcons name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
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

      {/* Sign Up Button */}
      <Animated.View
        style={[
          styles.signupButtonWrapper,
          { transform: [{ scale: buttonScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.signupButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSubmit}
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

      {/* Social Buttons */}
      <Text style={styles.dividerText}>- OR Continue with -</Text>
      <View style={styles.socialContainer}>
        {["google", "apple", "facebook"].map((platform, index) => (
          <Animatable.View
            key={platform}
            animation="bounceIn"
            delay={600 + index * 100}
            style={[
              styles.socialButton,
              hoveredSocial === platform && styles.socialButtonHovered,
            ]}
          >
            <TouchableOpacity
              onPress={() => console.log(`${platform} signup`)}
              onMouseEnter={() => setHoveredSocial(platform)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              {platform === "google" && (
                <Image
                  source={{
                    uri: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
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

      {/* Redirect to Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/loginpage")}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#333",
  },
  signupButtonWrapper: {
    width: "100%",
  },
  signupButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  signupGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerText: {
    color: "#888",
    marginVertical: 15,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonHovered: {
    backgroundColor: "#ddd",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#888",
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default SignupPage;
