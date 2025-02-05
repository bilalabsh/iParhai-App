import React, { useEffect, useState } from "react";
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
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { loginUser } from "../api/api";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const buttonScale = new Animated.Value(1);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [otp, setOtp] = useState(""); // OTP state
  const [loading, setLoading] = useState(true); // To handle initial loading state

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

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        console.log("Token fetched:", token);
        if (token) {
          router.replace("/dashboard"); // Redirect only if token exists
        } else {
          setLoading(false); // Ensure loading state is updated when no token
        }
      } catch (error) {
        console.error("Error checking user login:", error);
      }
    };

    checkUserLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = { email, password, otp };
      const data = await loginUser(userData);
      if (data.token) {
        console.log("arrha idhar ok");
        console.log("ab idhar ok");
        console.log("Login Successful", data);
        await SecureStore.setItemAsync("authToken", data.token);
        
        router.push("/dashboard"); //dashboard
      } else {
        console.error("Login failed", data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <View style={styles.container}>
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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
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

      {/* OTP Input */}
      <Animatable.View
        animation="fadeInUp"
        delay={400}
        style={[
          styles.inputContainer,
          activeInput === "otp" && styles.activeInputContainer,
        ]}
      >
        <MaterialIcons name="verified" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#aaa"
          value={otp}
          onChangeText={setOtp}
          onFocus={() => setActiveInput("otp")}
          onBlur={() => setActiveInput(null)}
          keyboardType="numeric"
        />
      </Animatable.View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push("/forgotpass")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Animated.View
        style={[
          styles.loginButtonWrapper,
          { transform: [{ scale: buttonScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.loginButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleLogin} // Call the login function here
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
      <Animatable.View
        animation="fadeInUp"
        delay={700}
        style={styles.signUpContainer}
      >
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
