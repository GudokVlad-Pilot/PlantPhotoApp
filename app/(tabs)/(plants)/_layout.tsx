import React from "react";
import { Stack } from "expo-router";

export default function PlantsLayout() {
  return (
    <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Plants',
                headerShown: false
            }}
        />
    </Stack>
  );
}