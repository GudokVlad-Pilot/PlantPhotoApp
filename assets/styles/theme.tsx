import { Dimensions, StyleSheet, useColorScheme } from "react-native";

export default function theme() {
  // Color set defenition
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const primary = colorScheme === "light" ? "#949D6A" : "#5A6340";
  const secondary = colorScheme === "light" ? "#F2BB05" : "#B28500";
  const tertiary = colorScheme === "light" ? "#F1EDEE" : "#2E2A2B";
  const quaternary = colorScheme === "light" ? "#2A2B2E" : "#D7CDCC";
  const inputColor = colorScheme === "light" ? "#2A2B2E" : "#E9DEDD";
  const cardColor = colorScheme === "light" ? "lightgray" : "#E9DEDD";
  const cardTextColor = colorScheme === "light" ? "#2A2B2E" : "#2E2A2B";
  const imagePickerTextColor = colorScheme === "light" ? "#8E8C8E" : "#8C8484";

  // Window/screen dimensions calculations
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = (windowWidth - 60) / 2;
  const plantImageWidth = cardWidth - 20;
  const imagePickerWidth = windowWidth / 2;
  const inputWidth = windowWidth - 40;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tertiary,
    },
    text: {
      fontSize: 18,
      color: quaternary,
    },
    listContainer: {
      justifyContent: "space-between",
      paddingBottom: 100,
      paddingHorizontal: 20,
      width: windowWidth,
    },
    scrollContainer: {
      alignItems: "center",
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    card: {
      width: cardWidth,
      flexDirection: "column",
      display: "flex",
      alignItems: "flex-start",
      padding: 10,
      marginHorizontal: 5,
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: cardColor,
    },
    cardText: { fontSize: 18, color: cardTextColor, marginVertical: 10 },
    plantImage: {
      width: plantImageWidth,
      height: plantImageWidth,
      borderRadius: 10,
    },
    dateText: {
      fontSize: 12,
      color: cardTextColor,
      alignSelf: "flex-end",
      marginTop: "auto",
    },
    button: {
      position: "absolute",
      bottom: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: secondary,
      borderRadius: 10,
      alignSelf: "center",
    },
    buttonText: { color: quaternary, fontSize: 16, fontWeight: "bold" },
    imagePicker: {
      width: imagePickerWidth,
      height: imagePickerWidth,
      borderWidth: 1,
      borderColor: quaternary,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      borderRadius: 10,
    },
    image: {
      width: imagePickerWidth,
      height: imagePickerWidth,
      borderRadius: 10,
    },
    imagePickerText: {
      textAlign: "center",
      color: imagePickerTextColor,
      fontSize: 18,
    },
    input: {
      width: inputWidth,
      padding: 10,
      borderWidth: 1,
      borderColor: inputColor,
      color: inputColor,
      borderRadius: 5,
      marginBottom: 15,
    },
    notesInput: {
      width: inputWidth,
      padding: 10,
      borderWidth: 1,
      borderColor: inputColor,
      color: inputColor,
      borderRadius: 5,
      marginBottom: 15,
      height: 200,
      textAlignVertical: "top",
    },
  });
}
