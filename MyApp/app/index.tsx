import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    setError("");
    if (!email || !password || !name) {
      setError("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to sign up");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.titleText}>Welcome</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={GlobalStyles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={GlobalStyles.button} onPress={handleSignUp}>
        <Text style={GlobalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[GlobalStyles.button, { backgroundColor: "#6c757d" }]}
        onPress={() => router.push("/loginpage")}
      >
        <Text style={GlobalStyles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
