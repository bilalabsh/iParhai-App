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
import { useRouter } from "expo-router";

const SubjectsPage = () => {
  const router = useRouter(); // Ensure this is inside the component to avoid scope issues.
  const [activeTab, setActiveTab] = useState("Topical"); // To track the active tab
  const [expandedSubject, setExpandedSubject] = useState(null); // For subjects
  const [expandedYear, setExpandedYear] = useState(null); // For past papers
  const [expandedSeason, setExpandedSeason] = useState(null); // For seasons
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [searchText, setSearchText] = useState("");

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
      "Calculating Acceleration from Speed-Time Graphs",
      "Freefall",
      "Terminal Velocity",
    ],
  },
  {
    title: "1.3 Mass & Weight",
    subtopics: ["Mass & Weight", "Measuring Mass & Weight"],
  },
  {
    title: "1.4 Density",
    subtopics: ["Density", "Measuring Density"],
  },
  {
    title: "1.5 Forces",
    subtopics: [
      "Resultant Forces",
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Investigating Force & Extension",
      "Hooke's Law",
      "Circular Motion",
      "Friction",
      "Stopping Distances",
      "Moments",
      "Equilibrium",
      "Centre of Gravity",
      "Investigating Centre of Gravity",
    ],
  },
  {
    title: "1.6 Momentum",
    subtopics: ["Momentum", "Impulse"],
  },
  {
    title: "1.7 Energy, Work and Power",
    subtopics: [
      "Energy Stores & Transfers",
      "Kinetic Energy",
      "Gravitational Potential Energy",
      "Elastic Potential Energy",
      "Conservation of Energy",
      "Work",
      "Power",
      "Efficiency",
      "Energy Resources",
      "Energy from the Sun",
      "Energy from Fuels",
      "Energy from Water",
      "Geothermal Energy",
      "Energy from Wind",
    ],
  },
  {
    title: "1.8 Pressure",
    subtopics: [
      "Pressure & Forces",
      "Pressure in a Liquid",
      "Atmospheric Pressure",
    ],
  },
  {
    title: "2.1 Kinetic Particle Model of Matter",
    subtopics: [
      "States of Matter",
      "Particle Model",
      "Temperature & Pressure",
      "Gases & Absolute Temperature",
    ],
  },
  {
    title: "2.2 Thermal Properties & Temperature",
    subtopics: [
      "Thermal Expansion",
      "Specific Heat Capacity",
      "Specific Latent Heat",
      "Melting, Boiling & Evaporation",
      "Evaporation",
    ],
  },
  {
    title: "2.3 Transfer of Thermal Energy",
    subtopics: [
      "Demonstrating Conduction",
      "Thermal Conduction",
      "Convection",
      "Radiation",
      "Investigating Radiation",
      "Consequences of Thermal Energy Transfer",
    ],
  },
  {
    title: "3.1 General Properties of Waves",
    subtopics: [
      "Features of Waves",
      "The Wave Equation",
      "Transverse & Longitudinal Waves",
      "Wave Behaviour",
      "Ripple Tank",
    ],
  },
  {
    title: "3.2 Light",
    subtopics: [
      "Reflection of Light",
      "Investigating Reflection",
      "Refraction of Light",
      "Snell's Law",
      "Total Internal Reflection",
      "Thin Lenses",
      "Ray Diagrams",
      "Linear Magnification",
      "Uses of Lenses",
      "Dispersion of Light",
    ],
  },
  {
    title: "3.3 Electromagnetic Spectrum",
    subtopics: [
      "Electromagnetic Waves",
      "Uses of Electromagnetic Waves",
      "Dangers of Electromagnetic Waves",
    ],
  },
  {
    title: "3.4 Sound",
    subtopics: [
      "Sound Waves",
      "Properties of Sound Waves",
      "Reflection of Sound Waves",
      "Measuring the Speed of Sound",
      "Ultrasound",
    ],
  },
  {
    title: "4.1 Simple Magnetism & Magnetic Fields",
    subtopics: [
      "Magnetism",
      "Magnets",
      "Magnetic Fields",
      "Plotting Magnetic Fields",
    ],
  },
  {
    title: "4.2 Electrical Quantities",
    subtopics: [
      "Electrical Charge",
      "Demonstrating Electric Charges",
      "Static Electricity",
      "Electric Fields",
      "Investigating Conductors & Insulators",
      "Electrical Current",
      "Electromotive Force & Potential Difference",
      "Resistance",
      "Resistance of a Wire",
    ],
  },
  {
    title: "4.3 Electric Circuits",
    subtopics: [
      "Circuit Diagrams & Circuit Components",
      "Current in Circuits",
      "Potential Difference in Circuits",
      "Combined Resistance",
      "Potential Dividers",
    ],
  },
  {
    title: "4.4 Practical Electricity",
    subtopics: [
      "Electrical Safety",
      "Electrical Energy",
      "Electrical Power",
    ],
  },
  {
    title: "4.5 Electromagnetic Effects",
    subtopics: [
      "Electromagnetic Induction",
      "Demonstrating Induction",
      "The A.C. Generator",
      "Magnetic Effect of a Current",
      "Force on a Current-Carrying Conductor",
      "Fields Around Parallel Conductors",
      "Electric Motors",
      "Transformers",
      "Transformer Calculations",
    ],
  },
  {
    title: "4.6 Uses of Oscilloscope",
    subtopics: ["Uses of an Oscilloscope"],
  },
  {
    title: "5.1 The Nuclear Model of the Atom",
    subtopics: ["The Atom", "The Nucleus"],
  },
  {
    title: "5.2 Radioactivity",
    subtopics: [
      "Detection of Radioactivity",
      "Background Radiation",
      "The Three Types of Emission",
      "Radioactive Decay",
      "Fusion",
      "Fission",
      "Half-Life",
      "Uses of Radiation",
      "Dangers of Radiation",
    ],
  },
  {
    title: "6.1 Earth & The Solar System",
    subtopics: [
      "The Earth, Moon & Sun",
      "Calculating Orbital Speeds",
      "The Solar System",
      "Orbiting Bodies",
      "Gravitational Effects on Orbits",
    ],
  },
  {
    title: "6.2 Stars & The Universe",
    subtopics: [
      "The Sun as a Star",
      "Stars",
      "The Universe",
    ],
  },
];


  const pastPapersData = [2019, 2020, 2021, 2022, 2023].map((year) => ({
    year,
    seasons: [
      {
        season: "Summer",
        papers: ["Paper 1", "Paper 2", "Paper 3"],
      },
      {
        season: "Winter",
        papers: ["Paper 1", "Paper 2", "Paper 3"],
      },
    ],
  }));

  const toggleSubject = (subject) => {
    setExpandedSubject(subject === expandedSubject ? null : subject);
  };

  const toggleYear = (year) => {
    setExpandedYear(year === expandedYear ? null : year);
  };

  const toggleSeason = (uniqueSeasonKey) => {
    setExpandedSeason(
      uniqueSeasonKey === expandedSeason ? null : uniqueSeasonKey
    );
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

  const handleNavigation = (path) => {
    if (router && typeof router.push === "function") {
      router.push(path);
    } else {
      console.error("Router is not available");
    }
  };

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
            {Array.isArray(pastPapersData) &&
              pastPapersData.map((paper, yearIndex) => (
                <View key={yearIndex} style={styles.subjectContainer}>
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
                      {Array.isArray(paper.seasons) &&
                        paper.seasons.map((season, seasonIndex) => {
                          const uniqueSeasonKey = `${paper.year}-${season.season}`;
                          return (
                            <View key={seasonIndex}>
                              <TouchableOpacity
                                onPress={() => toggleSeason(uniqueSeasonKey)}
                                style={styles.subjectHeader}
                              >
                                <Text style={styles.subtopicText}>
                                  {season.season}
                                </Text>
                                <Text style={styles.icon}>
                                  {expandedSeason === uniqueSeasonKey
                                    ? "−"
                                    : "+"}
                                </Text>
                              </TouchableOpacity>
                              {expandedSeason === uniqueSeasonKey && (
                                <View style={styles.subtopicsContainer}>
                                  {Array.isArray(season.papers) &&
                                    season.papers.map(
                                      (paper, paperIndex) => (
                                        <View
                                          key={paperIndex}
                                          style={styles.paperContainer}
                                        >
                                          <Text style={styles.paperText}>
                                            {paper}
                                          </Text>
                                          <TouchableOpacity
                                            style={styles.qpButton}
                                            onPress={() =>
                                              handleNavigation(`/qp/${paper}`)
                                            }
                                          >
                                            <Text style={styles.buttonText}>
                                              QP
                                            </Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                            style={styles.msButton}
                                            onPress={() =>
                                              handleNavigation(`/ms/${paper}`)
                                            }
                                          >
                                            <Text style={styles.buttonText}>
                                              MS
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      )
                                    )}
                                </View>
                              )}
                            </View>
                          );
                        })}
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
  paperContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 4,
},
paperText: {
  fontSize: 16,
  color: "#555",
  flex: 1,
},
qpButton: {
  backgroundColor: "#4a90e2",
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 4,
  marginLeft: 8,
},
msButton: {
  backgroundColor: "#50c878",
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 4,
  marginLeft: 8,
},
buttonText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "bold",
},
});

export default SubjectsPage;
