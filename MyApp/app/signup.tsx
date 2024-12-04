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

const SignupPage = ({ handleSignUp }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      router.push("/loginpage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Create an Account
      </Animatable.Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
          />
        </TouchableOpacity>
      </Animatable.View>
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
          />
        </TouchableOpacity>
      </Animatable.View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <LinearGradient
          colors={["#4A90E2", "#007BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signupGradient}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
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
