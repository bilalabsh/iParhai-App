import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Layout from "./layout"; // Import your Layout component

const SettingsScreen = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          router.replace("/loginpage"); // Replace with login page
        },
      },
    ]);
  };

  // Theme styles based on darkMode state
  const themeStyles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <Layout>
    <View style={[styles.outerContainer, themeStyles.outerContainer]}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container, themeStyles.container]}>
          {/* Header */}
          <Text style={[styles.header, themeStyles.header]}>Settings</Text>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <FontAwesome
                name="user-circle"
                size={80}
                color={darkMode ? "#4A4A4A" : "#E0E0E0"}
              />
              <TouchableOpacity style={[styles.editIcon, themeStyles.editIcon]}>
                <MaterialIcons name="edit" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>
              Account
            </Text>
            <TextInput
              style={[styles.input, themeStyles.input]}
              placeholder="Name"
              placeholderTextColor={darkMode ? "#A0A0A0" : "#808080"}
              defaultValue="Ishma Hafeez"
            />
            <TextInput
              style={[styles.input, themeStyles.input]}
              placeholder="Email Address"
              placeholderTextColor={darkMode ? "#A0A0A0" : "#808080"}
              defaultValue="ishmahafeez@gmail.com"
              keyboardType="email-address"
            />
          </View>

          {/* App Settings */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>
              App Settings
            </Text>
            <View style={styles.row}>
              <MaterialIcons
                name="dark-mode"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>
                Dark mode
              </Text>
              <TouchableOpacity
                style={styles.switch}
                onPress={() => setDarkMode(!darkMode)}
              >
                <MaterialIcons
                  name={darkMode ? "toggle-on" : "toggle-off"}
                  size={30}
                  color={darkMode ? "#4A90E2" : "#E0E0E0"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>
              Support
            </Text>
            <TouchableOpacity style={styles.row}>
              <MaterialIcons
                name="help"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>
                Help Center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <MaterialIcons
                name="play-circle"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>Tutorial</Text>
            </TouchableOpacity>
          </View>

          {/* Follow Us */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>
              Follow Us
            </Text>
            <TouchableOpacity style={styles.row}>
              <FontAwesome
                name="thumbs-o-up"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>
                Rate the app
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <FontAwesome
                name="users"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>
                About the team
              </Text>
            </TouchableOpacity>
          </View>

          {/* Legal */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, themeStyles.sectionHeader]}>
              Legal
            </Text>
            <TouchableOpacity style={styles.row}>
              <MaterialIcons
                name="policy"
                size={24}
                color={darkMode ? "#A0A0A0" : "#4A4A4A"}
              />
              <Text style={[styles.rowText, themeStyles.rowText]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutButton, themeStyles.logoutButton]}
            onPress={handleLogout}
          >
            <Text
              style={[styles.logoutButtonText, themeStyles.logoutButtonText]}
            >
              LOG OUT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </Layout>
    
  );
};

// Light and Dark theme styles
const lightThemeStyles = {
  outerContainer: { backgroundColor: "#F9F9F9" },
  header: { color: "#000" },
  sectionHeader: { color: "#4A4A4A" },
  input: { backgroundColor: "#FFF", color: "#000", borderColor: "#E0E0E0" },
  rowText: { color: "#4A4A4A" },
  logoutButton: { backgroundColor: "#4A90E2" },
  logoutButtonText: { color: "#FFF" },
  navBar: { backgroundColor: "#FFF" },
  navText: { color: "#4A4A4A" },
  activeNavText: { color: "black" },
  editIcon: { backgroundColor: "#4A90E2" },
};

const darkThemeStyles = {
  outerContainer: { backgroundColor: "#121212" },
  header: { color: "#FFF" },
  sectionHeader: { color: "#E0E0E0" },
  input: { backgroundColor: "#1F1F1F", color: "#FFF", borderColor: "#333333" },
  rowText: { color: "#E0E0E0" },
  logoutButton: { backgroundColor: "#4A90E2" },
  logoutButtonText: { color: "#FFF" },
  navBar: { backgroundColor: "#1F1F1F" },
  navText: { color: "#A0A0A0" },
  activeNavText: { color: "white" },
  editIcon: { backgroundColor: "#333333" },
};

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 80 },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  profileSection: { alignItems: "center", marginBottom: 20 },
  profileImage: { position: "relative" },
  editIcon: { position: "absolute", bottom: 0, right: 10, borderRadius: 20, padding: 5 },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, fontSize: 14, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1 },
  rowText: { fontSize: 14, marginLeft: 10, flex: 1 },
  switch: { marginRight: 10 },
  logoutButton: { paddingVertical: 15, borderRadius: 10, marginTop: 20, alignItems: "center" },
  logoutButtonText: { fontSize: 16, fontWeight: "bold" },
  navBar: { flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 0, width: "100%", paddingVertical: 10, borderTopWidth: 1 },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 2 },
  activeNavText: { fontWeight: "bold" },
});

export default SettingsScreen;
