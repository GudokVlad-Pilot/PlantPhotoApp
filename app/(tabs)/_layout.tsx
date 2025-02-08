import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const themeBackgroundStyle = colorScheme === "light" ? "#949D6A" : "#5A6340";
  const themeBarActiveStyle = colorScheme === "light" ? "#F2BB05" : "#B28500";
  const themeBarInactiveStyle = colorScheme === "light" ? "#F1EDEE" : "#D7CDCC";

  return (
    <Tabs
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
        tabBarActiveTintColor: themeBarActiveStyle,
        tabBarInactiveTintColor: themeBarInactiveStyle,
        tabBarStyle: {
          backgroundColor: themeBackgroundStyle,
          borderColor: themeBackgroundStyle,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="(plants)" options={{ title: "List" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
