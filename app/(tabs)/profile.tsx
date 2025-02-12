import React from "react";
import { View, Text } from "react-native";
import theme from "@/assets/styles/theme";

export default function ProfileView() {
  // Theme defenition
  const style = theme();

  return (
    // Profile view with placeholder
    <View style={style.container}>
      <Text style={style.text}>Profile View</Text>
    </View>
  );
}
