import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Layout from "./layout"; // Import your Layout component

// Sample data for subjects
const subjectsData = [
  {
    title: "1.1 Physical Quantities & Measurement Techniques",
    subtopics: [
      "1.11 Measurement",
      "1.12 Scalars & Vectors",
      "1.13 Calculating with Vectors",
    ],
  },
  {
    title: "1.2 Motion",
    subtopics: [
      "1.21 Speed & Velocity",
      "1.22 Acceleration",
      "1.23 Distance-Time Graphs",
      "1.24 Speed-Time Graphs",
    ],
  },
  // Add more subjects and subtopics as needed
];

// Sample data for past papers
const pastPapersData = [
  {
    year: "2022",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
  },
  {
    year: "2021",
    papers: ["Paper 1", "Paper 2", "Paper 3"],
  },
  // Add more years and papers as needed
];

const SubjectsPage = () => {
  const [activeTab, setActiveTab] = useState("Topical"); // To track the active tab
  const [expandedSubject, setExpandedSubject] = useState(null); // For subjects
  const [expandedYear, setExpandedYear] = useState(null); // For past papers
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [searchText, setSearchText] = useState("");

  const toggleSubject = (subject) => {
    setExpandedSubject(subject === expandedSubject ? null : subject);
  };

  const toggleYear = (year) => {
    setExpandedYear(year === expandedYear ? null : year);
  };

  const toggleSubtopic = (subtopic) => {
    if (selectedSubtopics.includes(subtopic)) {
      setSelectedSubtopics((prev) =>
        prev.filter((item) => item !== subtopic)
      );
    } else {
      setSelectedSubtopics((prev) => [...prev, subtopic]);
    }
  };

  const filteredSubjects = subjectsData.filter((subject) =>
    subject.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Tab Section */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("Topical")}
            style={[
              styles.tab,
              activeTab === "Topical" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Topical" && styles.activeTabText,
              ]}
            >
              Topical
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Past Papers")}
            style={[
              styles.tab,
              activeTab === "Past Papers" && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Past Papers" && styles.activeTabText,
              ]}
            >
              Past Papers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "Topical" ? (
          <ScrollView style={styles.scrollView}>
            {filteredSubjects.map((subject, index) => (
              <View key={index} style={styles.subjectContainer}>
                <TouchableOpacity
                  onPress={() => toggleSubject(subject.title)}
                  style={styles.subjectHeader}
                >
                  <Text style={styles.subjectTitle}>{subject.title}</Text>
                  <Text style={styles.icon}>
                    {expandedSubject === subject.title ? "−" : "+"}
                  </Text>
                </TouchableOpacity>
                {expandedSubject === subject.title &&
                  subject.subtopics.length > 0 && (
                    <View style={styles.subtopicsContainer}>
                      {subject.subtopics.map((subtopic, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={[
                            styles.subtopicItem,
                            selectedSubtopics.includes(subtopic) &&
                              styles.selectedSubtopic,
                          ]}
                          onPress={() => toggleSubtopic(subtopic)}
                        >
                          <Text style={styles.subtopicText}>{subtopic}</Text>
                          <Text style={styles.icon}>
                            {selectedSubtopics.includes(subtopic)
                              ? "✓"
                              : "+"}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollView}>
            {pastPapersData.map((paper, index) => (
              <View key={index} style={styles.subjectContainer}>
                <TouchableOpacity
                  onPress={() => toggleYear(paper.year)}
                  style={styles.subjectHeader}
                >
                  <Text style={styles.subjectTitle}>{paper.year}</Text>
                  <Text style={styles.icon}>
                    {expandedYear === paper.year ? "−" : "+"}
                  </Text>
                </TouchableOpacity>
                {expandedYear === paper.year && (
                  <View style={styles.subtopicsContainer}>
                    {paper.papers.map((p, idx) => (
                      <Text key={idx} style={styles.subtopicText}>
                        {p}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        {/* Selected Subtopics */}
        {activeTab === "Topical" && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>Selected Subtopics</Text>
            {selectedSubtopics.length === 0 ? (
              <Text style={styles.noSelectionText}>
                Select your subtopics from the list above
              </Text>
            ) : (
              <FlatList
                data={selectedSubtopics}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.selectedSubtopic}>{item}</Text>
                )}
              />
            )}
          </View>
        )}

        {/* Generate Resources Button */}
        {activeTab === "Topical" && (
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate Resources</Text>
          </TouchableOpacity>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchBar: {
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#4a90e2",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  subjectContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    fontSize: 18,
    color: "#888",
  },
  subtopicsContainer: {
    marginTop: 8,
  },
  subtopicText: {
    fontSize: 16,
    color: "#555",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedContainer: {
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    marginVertical: 16,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noSelectionText: {
    color: "#888",
  },
  selectedSubtopic: {
    fontSize: 16,
    color: "#333",
  },
  generateButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubjectsPage;
