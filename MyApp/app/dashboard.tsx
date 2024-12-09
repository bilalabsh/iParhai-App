import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import Layout from "./layout"; // Import your Layout component

const Dashboard = () => {
  const weeklyStreak = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const streakStatus = ["X", "X", "X", "X", "X", "X", "X"]; // Example streak

  return (
    <Layout>
      {/* Main Dashboard Content */}
      <View style={styles.container}>
        {/* Greeting Section */}
        <Text style={styles.greeting}>Hi, Ishma</Text>
        <Text style={styles.description}>
          Let's start by taking a diagnostic test to better understand where you
          stand and personalize a learning curve for you.
        </Text>

        {/* Daily Streak Section */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakTitle}>Daily Streak</Text>
          <Text style={styles.streakSubtitle}>This Week</Text>
          <View style={styles.streakRow}>
            {weeklyStreak.map((day, index) => (
              <View key={day} style={styles.streakItem}>
                <Text style={styles.streakStatus}>{streakStatus[index]}</Text>
                <Text style={styles.streakDay}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Diagnostic Test Button */}
        <TouchableOpacity style={styles.diagnosticButton}>
          <Text style={styles.diagnosticButtonText}>Take a Diagnostic Test</Text>
        </TouchableOpacity>

        {/* Carousel/Additional Info Section */}
        <View style={styles.carouselContainer}>
          <Image
            style={styles.carouselImage}
            source={{
              uri: "https://example.com/sample-image.png", // Replace with your image URL
            }}
          />
          <Text style={styles.carouselText}>Learn At your Own Pace</Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  streakContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  streakSubtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  streakRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streakItem: {
    alignItems: "center",
  },
  streakStatus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5252",
  },
  streakDay: {
    fontSize: 12,
    color: "#777",
  },
  diagnosticButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  diagnosticButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  carouselContainer: {
    backgroundColor: "#e7f3ff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  carouselImage: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default Dashboard;
