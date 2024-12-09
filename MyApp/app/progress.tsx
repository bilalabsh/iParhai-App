import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Layout from "./layout"; // Import your Layout component

const ProgressPage = () => {
  const screenWidth = Dimensions.get("window").width;

  // Sample data
  const userProfile = {
    name: "Ishma Hafeez",
    strengths: ["Motion", "Electric Circuits"],
    weaknesses: ["Thermal Physics", "Sound"],
    improvement: 22,
  };

  const performanceTrendData = {
    labels: ["Test 1", "Test 2", "Test 3"],
    datasets: [
      {
        data: [35, 40, 65], // Performance values
      },
    ],
  };

  const topicPerformanceData = [
    { topic: "Sound", score: 85, color: "#fdd835" },
    { topic: "Motion", score: 75, color: "#f57f17" },
    { topic: "Forces", score: 65, color: "#e53935" },
    { topic: "Waves", score: 55, color: "#00bcd4" },
    { topic: "Thermal", score: 50, color: "#4caf50" },
  ];

  return (
    <Layout>
    <View style={styles.container}>
      <ScrollView>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100", // Replace with user's profile picture URL
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.improvementText}>
              Improved by{" "}
              <Text style={styles.improvementPercentage}>
                {userProfile.improvement}%
              </Text>
            </Text>
            <View style={styles.strengthsWeaknesses}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Strengths</Text>
                {userProfile.strengths.map((strength, index) => (
                  <Text key={index} style={styles.sectionItem}>
                    {strength}
                  </Text>
                ))}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Weaknesses</Text>
                {userProfile.weaknesses.map((weakness, index) => (
                  <Text key={index} style={styles.sectionItem}>
                    {weakness}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* View Test Results Button */}
        <TouchableOpacity style={styles.testResultsButton}>
          <Text style={styles.testResultsButtonText}>View Test Results</Text>
        </TouchableOpacity>

{/* Overall Performance Section */}
<Text style={styles.sectionHeader}>Overall Performance</Text>
<View style={styles.performanceChartContainer}>
  <Text style={styles.chartTitle}>Performance Trend</Text>
  <LineChart
    data={performanceTrendData}
    width={screenWidth - 32}
    height={220}
    chartConfig={{
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      color: (opacity = 1) => `rgba(72, 145, 220, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 3,
      propsForDots: {
        r: "5",
        strokeWidth: "1",
        stroke: "#4891dc",
      },
      propsForBackgroundLines: {
        strokeDasharray: "", // Removes dashed lines
      },
    }}
    style={styles.chart}
  />
</View>

{/* Topic Performance Section */}
<Text style={styles.sectionHeader}>Topic Performance</Text>
<View style={styles.topicPerformanceContainer}>
  {topicPerformanceData.map((item, index) => (
    <View key={index} style={styles.topicPerformanceItem}>
      <Text style={styles.topicTitle}>{item.topic}</Text>
      <View style={styles.topicBarContainer}>
        <View
          style={[
            styles.topicBar,
            { width: `${item.score}%`, backgroundColor: item.color },
          ]}
        />
      </View>
      <Text style={styles.topicScore}>{item.score}%</Text>
    </View>
  ))}
</View>

      </ScrollView>

      {/* Bottom Navigation Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Subjects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  improvementText: {
    marginTop: 4,
    fontSize: 14,
    color: "#888",
  },
  improvementPercentage: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  strengthsWeaknesses: {
    flexDirection: "row",
    marginTop: 12,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionItem: {
    fontSize: 14,
    color: "#555",
  },
  testResultsButton: {
    marginHorizontal: 16,
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  testResultsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
  },
  chart: {
  borderRadius: 10,
  paddingRight: 20,
},
  performanceChartContainer: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  chart: {
    borderRadius: 10,
  },
  topicPerformanceContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  topicPerformanceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  topicTitle: {
    width: 80,
    fontSize: 14,
    color: "#333",
  },
topicBarContainer: {
  flex: 1,
  height: 12, // Increased height for a more prominent look
  backgroundColor: "#e0e0e0",
  borderRadius: 0, // Make it rectangular
  marginHorizontal: 8,
},
  topicBar: {
    height: "100%",
  },
  topicScore: {
    width: 40,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    color: "#888",
    fontSize: 14,
  },
  activeTab: {
    alignItems: "center",
  },
  activeTabText: {
    color: "#4a90e2",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProgressPage;
