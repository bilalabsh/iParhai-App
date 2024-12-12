import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // Import useRouter for navigation

const AppIntroScreen = () => {
  const logoScale = useSharedValue(0); // Animation for logo
  const buttonScale = useSharedValue(1); // Animation for buttons
  const [hoveredButton, setHoveredButton] = useState(null); // Tracks hovered buttons
  const router = useRouter(); // Initialize router for navigation

  // Animate logo on mount
  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 1000 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoScale.value,
  }));

  const handlePressIn = () => {
    buttonScale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    buttonScale.value = withTiming(1, { duration: 150 });
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
    transition: "transform 0.15s ease-in-out",
  }));

  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image
          source={{
            uri: "https://via.placeholder.com/100", // Replace with your logo URL
          }}
          style={styles.logo}
        />
        <Text style={styles.appName}>iParhai</Text>
      </Animated.View>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        {[
          "up-to-date past papers",
          "topical questions",
          "notes, videos, flashcards",
          "visual dashboard",
          "feedback",
        ].map((feature, index) => (
          <Animated.View
            key={index}
            style={styles.featureItem}
            entering={FadeInDown.delay(index * 100)}
          >
            <MaterialIcons name="check-circle" size={24} color="#4A90E2" />
            <Text style={styles.featureText}>{feature}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            style={[
              styles.exploreButton,
              hoveredButton === "explore" && styles.hoveredExploreButton,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onMouseEnter={() => setHoveredButton("explore")}
            onMouseLeave={() => setHoveredButton(null)}
            onPress={() => router.push("/intro2")} // Navigate to Explore Features
          >
            <LinearGradient
              colors={["#3A78C0", "#0056B0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.exploreButtonText}>Explore Features</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            style={[
              styles.getStartedButton,
              hoveredButton === "getStarted" && styles.hoveredGetStartedButton,
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onMouseEnter={() => setHoveredButton("getStarted")}
            onMouseLeave={() => setHoveredButton(null)}
            onPress={() => router.push("signup")} // Navigate to Get Started
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  featuresContainer: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  exploreButton: {
    width: "90%",
    height: 60,
    marginBottom: 15,
    borderRadius: 30,
    overflow: "hidden",
  },
  gradientButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  exploreButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  hoveredExploreButton: {
    transform: [{ scale: 1.05 }],
    shadowColor: "#3A78C0",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  getStartedButton: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#3A78C0",
    backgroundColor: "#FFF",
  },
  getStartedButtonText: {
    color: "#3A78C0",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  hoveredGetStartedButton: {
    transform: [{ scale: 1.05 }],
    backgroundColor: "#EBF5FF",
    borderColor: "#0056B0",
    shadowColor: "#0056B0",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
});

export default AppIntroScreen;
