import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // The initial stack for the tabs and basic navigation
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
