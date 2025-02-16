import React from "react";
import { Stack } from "expo-router";
import { PlantProvider } from "./plantContext/PlantContext";
import { useThemeColors } from "@/assets/styles/theme";

export default function PlantsLayout() {
  // Colors for top bar
  const { primary, barElementColor } = useThemeColors();

  return (
    // The context for storing plants details
    <PlantProvider>
      {/* The stack for the List View, Scan View and Detail View */}
      <Stack
        // Top bar styles
        screenOptions={{
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: barElementColor,
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
