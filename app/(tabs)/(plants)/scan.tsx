import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "./plantContext/PlantContext";
import { useRouter } from "expo-router";

export default function ScanView() {
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeImagePicker =
    colorScheme === "light" ? styles.lightImagePicker : styles.darkImagePicker;
  const themeImageText =
    colorScheme === "light" ? styles.lightImageText : styles.darkImageText;
  const themeInput =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeNotesInput =
    colorScheme === "light" ? styles.lightNotesInput : styles.darkNotesInput;
  const themePlaceholderColor = colorScheme === "light" ? "#8E8C8E" : "#8C8484";
  const themeButton =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;
  const themeButtonText =
    colorScheme === "light" ? styles.lightButtonText : styles.darkButtonText;

  // Context and navigation for the Scan View
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [plantPicture, setPlantPicture] = useState<string | null>(null);
  const { addPlant } = usePlants();
  const router = useRouter();

  // Plant data saving (checking if plant name was inputed)
  const handleSave = () => {
    if (name.trim() !== "") {
      addPlant(name, notes.trim() || undefined, plantPicture || undefined);
      router.back(); // Once saved, the user will be navigated back to List View
    } else {
      alert("Plant name is required"); // User will receive alert if plant name is missing
    }
  };

  // Image picker from device storage or camera
  const pickImage = async () => {
    // Checking if the app is launched on web
    if (Platform.OS === "web") {
      // Picking the image from device storage
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setPlantPicture(reader.result as string); // Transfering file to string for context
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // If the app is launched on mobile device, it creates alert
      Alert.alert(
        "Select Plant Picture",
        "Add photo from Camera or Gallery",
        [
          {
            // Camera option
            text: "Camera",
            onPress: async () => {
              // Requesting permissions to use camera
              const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
              if (status !== "granted") {
                alert("Permission to access camera is required!");
                return;
              }

              // Lauching the camera
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1], // Image cropping is required, as the app images are displayed in square format
                quality: 1,
              });

              if (!result.canceled && result.assets.length > 0) {
                setPlantPicture(result.assets[0].uri);
              }
            },
          },
          {
            // Gallery option
            text: "Gallery",
            onPress: async () => {
              // Requesting permissions to use gallery
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Permission to access gallery is required!");
                return;
              }

              // Openning the gallery
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // Image cropping is required, as the app images are displayed in square format
                quality: 1,
              });

              if (!result.canceled && result.assets.length > 0) {
                setPlantPicture(result.assets[0].uri);
              }
            },
          },
        ],
        { cancelable: true } // Alert can be closed by clicking outside the box or "back" button
      );
    }
  };

  return (
    <View style={themeContainerStyle}>
      {/* Scroll view is used in case of keyboard extention */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image picker */}
        <TouchableOpacity onPress={pickImage} style={themeImagePicker}>
          {/* If the picture is added, it will be shown in the box. Otherwise, a text will be displayed. */}
          {plantPicture ? (
            <Image source={{ uri: plantPicture }} style={styles.image} />
          ) : (
            <Text style={themeImageText}>Add plant picture (optional)</Text>
          )}
        </TouchableOpacity>

        {/* Input field for plant name (one line field) */}
        <TextInput
          placeholder="Plant name"
          placeholderTextColor={themePlaceholderColor}
          value={name}
          onChangeText={setName}
          style={themeInput}
          multiline={false}
        />

        {/* Input field for notes (multiline scrollable field) */}
        <TextInput
          placeholder="Notes (optional)"
          placeholderTextColor={themePlaceholderColor}
          value={notes}
          onChangeText={setNotes}
          style={themeNotesInput}
          multiline={true}
          scrollEnabled={true}
        />

        {/* Save button */}
        <TouchableOpacity onPress={handleSave} style={themeButton}>
          <Text style={themeButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Window/screen dimensions calculations
const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth / 2;
const inputWidth = windowWidth - 40;

// Styles for the components
const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#F1EDEE",
    flex: 1,
    alignItems: "center",
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  lightImagePicker: {
    width: imageWidth,
    height: imageWidth,
    borderWidth: 1,
    borderColor: "#2A2B2E",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 10,
  },
  darkImagePicker: {
    width: imageWidth,
    height: imageWidth,
    borderWidth: 1,
    borderColor: "#E9DEDD",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 10,
  },
  lightImageText: { textAlign: "center", color: "#8E8C8E", fontSize: 18 },
  darkImageText: { textAlign: "center", color: "#8C8484", fontSize: 18 },
  image: { width: imageWidth, height: imageWidth, borderRadius: 10 },
  lightInput: {
    width: inputWidth,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2A2B2E",
    color: "#2A2B2E",
    borderRadius: 5,
    marginBottom: 15,
  },
  darkInput: {
    width: inputWidth,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E9DEDD",
    color: "#E9DEDD",
    borderRadius: 5,
    marginBottom: 15,
  },
  lightNotesInput: {
    width: inputWidth,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2A2B2E",
    color: "#2A2B2E",
    borderRadius: 5,
    marginBottom: 15,
    height: 200,
    textAlignVertical: "top",
  },
  darkNotesInput: {
    width: inputWidth,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E9DEDD",
    color: "#E9DEDD",
    borderRadius: 5,
    marginBottom: 15,
    height: 200,
    textAlignVertical: "top",
  },
  lightButton: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2BB05",
    borderRadius: 10,
    alignSelf: "center",
  },
  darkButton: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B28500",
    borderRadius: 10,
    alignSelf: "center",
  },
  lightButtonText: { color: "#2A2B2E", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#E9DEDD", fontSize: 16, fontWeight: "bold" },
});
