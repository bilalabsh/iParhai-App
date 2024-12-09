import React from "react";
import { usePathname } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current page is not '/' or '/loginpage'
  const showTabs = pathname !== "/" && pathname !== "/loginpage";

  if (showTabs) {
    return (
      <View style={{ flex: 1 }}>
        {/* Main content */}
        <View style={{ flex: 1 }}>{children}</View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity onPress={() => router.push("/dashboard")}>
            <MaterialIcons name="home" size={24} />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/subjectspage")}>
            <MaterialIcons name="menu-book" size={24} />
            <Text>Subjects</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/progress")}>
            <MaterialIcons name="show-chart" size={24} />
            <Text>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <MaterialIcons name="settings" size={24} />
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <>{children}</>; // No tabs displayed for / and /loginpage
};

export default Layout;
