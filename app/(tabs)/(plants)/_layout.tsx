import React from "react";
import { Stack } from "expo-router";
import { PlantProvider } from "./plantContext/PlantContext";

export default function PlantsLayout() {
  return (
    <PlantProvider>
      <Stack>
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
