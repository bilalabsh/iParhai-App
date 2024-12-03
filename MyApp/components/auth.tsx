// Example Auth component using Context API or similar for authentication
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { registerUser, loginUser } from "../api/api"; // API methods for signup/login
import { useAuth } from "../context/authContext"; // Auth context

const Auth = ({ onLogin, onSignup }) => {
  const { setUser } = useAuth(); // Assuming useAuth provides a context to set the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleSignup = async () => {
    try {
      const userData = { name, email, password };
      const response = await registerUser(userData);
      setUser(response); // Set user in context after signup
      onSignup(); // Trigger the onSignup prop to move to Home screen
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      setUser(response); // Set user in context after login
      onLogin(); // Trigger the onLogin prop to move to Home screen
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isSignup ? "Signup" : "Login"}</Text>
      {isSignup && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isSignup ? "Signup" : "Login"} onPress={handleSubmit} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title={isSignup ? "Switch to Login" : "Switch to Signup"}
        onPress={() => setIsSignup(!isSignup)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginTop: 12,
  },
});

export default Auth;
