import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const Intro3Screen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>2/3</Text>
      </View>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/Sales consulting-pana 1.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>View Results</Text>
        <Text style={styles.description}>
          A dashboard will display charts and graphs to display your results
        </Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          {/* Prev Button */}
          <TouchableOpacity
            onPress={() => router.push("/intro2")} // Navigate back
          >
            <Text style={styles.navButtonText}>Prev</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            onPress={() => router.push("/intro4")} // Navigate forward
          >
            <Text style={[styles.navButtonText, styles.nextButtonText]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pagination Indicator */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButtonText: {
    fontSize: 18,
    color: "#999", // Light gray for inactive
    fontWeight: "bold",
  },
  nextButtonText: {
    color: "#4A90E2", // Blue for active
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24,
    height: 8,
    backgroundColor: "#2C3E50", // Active dot color
  },
});

export default Intro3Screen;
