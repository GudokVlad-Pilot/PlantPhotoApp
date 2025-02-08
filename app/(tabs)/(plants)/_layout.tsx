import React from "react";
import { Stack } from "expo-router";

export default function PlantsLayout() {
  return (
    <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'List',
                headerShown: false
            }}
        />
        <Stack.Screen
            name="scan"
            options={{
                title: 'Scan',
                headerShown: false
            }}
        />
        <Stack.Screen
            name="plant/[id]"
            options={{ 
                title: 'Detail',
                headerShown: false
            }}
        />
    </Stack>
  );
}