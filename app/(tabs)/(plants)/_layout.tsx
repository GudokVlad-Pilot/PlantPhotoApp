import React from "react";
import { Stack } from "expo-router";
import { PlantProvider } from "./plantContext/PlantContext";
import { useColorScheme } from "react-native";

export default function PlantsLayout() {
    const colorScheme = useColorScheme();
    
      const themeBackgroundStyle = colorScheme === "light" ? "#949D6A" : "#5A6340";
      const themeTextStyle = colorScheme === "light" ? "#F1EDEE" : "#D7CDCC";
      
  return (
    <PlantProvider>
      <Stack
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
        <Stack.Screen
          name="index"
          options={{
            title: "List",
          }}
        />
        <Stack.Screen
          name="scan"
          options={{
            title: "Scan",
          }}
        />
        <Stack.Screen
          name="plant/[id]"
          options={{
            title: "Detail",
          }}
        />
      </Stack>
    </PlantProvider>
  );
}
