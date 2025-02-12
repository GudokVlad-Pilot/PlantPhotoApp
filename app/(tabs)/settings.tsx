import darkTheme from "@/assets/styles/darkTheme";
import generalTheme from "@/assets/styles/generalTheme";
import lightTheme from "@/assets/styles/lightTheme";
import React from "react";
import { View, Text, useColorScheme } from "react-native";

export default function SettingsView() {
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  return (
    // Settings view with placeholder
    <View style={[generalTheme.container, theme.container]}>
      <Text style={[generalTheme.text, theme.text]}>Settings View</Text>
    </View>
  );
}
