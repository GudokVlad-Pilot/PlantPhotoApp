import theme from "@/assets/styles/theme";
import React from "react";
import { View, Text } from "react-native";

export default function SettingsView() {
  // Theme defenition
  const style = theme();

  return (
    // Settings view with placeholder
    <View style={style.container}>
      <Text style={style.text}>Settings View</Text>
    </View>
  );
}
