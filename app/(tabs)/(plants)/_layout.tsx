import React from "react";
import { Stack } from "expo-router";
import { PlantProvider } from "./plantContext/PlantContext";
import { useColorScheme } from "react-native";

export default function PlantsLayout() {
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const themeBackgroundStyle = colorScheme === "light" ? "#949D6A" : "#5A6340";
  const themeTextStyle = colorScheme === "light" ? "#F1EDEE" : "#D7CDCC";

  return (
    // The context for storing plants details
    <PlantProvider>
      {/* The stack for the List View, Scan View and Detail View */}
      <Stack
        // Top bar styles
        screenOptions={{
          headerStyle: {
            backgroundColor: themeBackgroundStyle,
          },
          headerTintColor: themeTextStyle,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Screens/views with names where user will be navigated */}

        {/* List View */}
        <Stack.Screen
          name="index"
          options={{
            title: "Plant Collection",
          }}
        />

        {/* Scan View */}
        <Stack.Screen
          name="scan"
          options={{
            title: "Add New Plant",
          }}
        />

        {/* Detail View */}
        <Stack.Screen
          name="plant/[id]"
          options={{
            title: "Plant Details",
          }}
        />
      </Stack>
    </PlantProvider>
  );
}
