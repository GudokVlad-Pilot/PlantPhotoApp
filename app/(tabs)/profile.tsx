import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

export default function ProfileView() {
  const colorScheme = useColorScheme(); // Detecting the color scheme of the user

  // Style defenitions of the components for light/dark theme
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    // Profile view with placeholder
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Profile View</Text>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  lightContainer: {
    backgroundColor: "#F1EDEE",
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
  },
  lightThemeText: {
    color: "#2A2B2E",
  },
  darkThemeText: {
    color: "#D7CDCC",
  },
});
