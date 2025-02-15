import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/assets/styles/theme";

export default function TabsLayout() {
  // Colors for bottom bar
  const {
      primary,
      accent,
      barElementColor,
    } = useThemeColors();

  return (
    // Navigation with tabs
    <Tabs
      // Bottom navigation bar with icons
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "(plants)") {
            iconName = "leaf";
          } else if (route.name === "profile") {
            iconName = "person";
          } else if (route.name === "settings") {
            iconName = "settings";
          } else {
            iconName = "ellipse";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Bottom navigation bar styles
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: barElementColor,
        tabBarStyle: {
          backgroundColor: primary,
          borderColor: primary,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarPosition: "bottom",
      })}
    >
      {/* Screens/views where the user can navigate with bottom bar */}

      {/* List View/Detail View/Scan View */}
      <Tabs.Screen name="(plants)" options={{ title: "List" }} />

      {/* Profile View */}
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />

      {/* Settings View */}
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
