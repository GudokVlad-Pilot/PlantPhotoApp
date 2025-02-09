import React, { useState, useEffect } from "react";
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
import { usePlants } from "../plantContext/PlantContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DetailView() {
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeButton =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;
  const themeCancelButton =
    colorScheme === "light"
      ? styles.lightCancelButton
      : styles.darkCancelButton;
  const themeSaveButton =
    colorScheme === "light" ? styles.lightSaveButton : styles.darkSaveButton;
  const themeButtonText =
    colorScheme === "light" ? styles.lightButtonText : styles.darkButtonText;
  const themeDateText =
    colorScheme === "light" ? styles.lightDateText : styles.darkDateText;
  const themeNameText =
    colorScheme === "light" ? styles.lightNameText : styles.darkNameText;
  const themeNotesText =
    colorScheme === "light" ? styles.lightNotesText : styles.darkNotesText;
  const themeInput =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeNotesInput =
    colorScheme === "light" ? styles.lightNotesInput : styles.darkNotesInput;
  const themePlaceholderColor = colorScheme === "light" ? "#8E8C8E" : "#8C8484";
  const themeImagePicker =
    colorScheme === "light" ? styles.lightImagePicker : styles.darkImagePicker;
  const themeImageText =
    colorScheme === "light" ? styles.lightImageText : styles.darkImageText;

  // Context and navigation for the Detail View
  const { id } = useLocalSearchParams();
  const { plants, updatePlant } = usePlants();
  const plant = plants.find((plant) => plant.id === Number(id));
  const [addedAt, setAddedAt] = useState(plant?.addedAt || ""); // Can be changed into "modifiedAt" in the future updates
  const [name, setName] = useState(plant?.name || "");
  const [notes, setNotes] = useState(plant?.notes || "");
  const [plantPicture, setPlantPicture] = useState<string | null>(
    plant?.plantPicture || null
  );
  const router = useRouter();

  // Switch between Detail and Edit modes (Detail mode by default)
  const [isEditing, setIsEditing] = useState(false);

  // Formating the date to align US format
  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Defenition of the selected plant
  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setNotes(plant.notes || "");
      setPlantPicture(plant.plantPicture || null);
    }
  }, [plant]);

  // Plant data saving (checking if plant name was inputed)
  const handleSave = () => {
    if (name.trim() !== "") {
      updatePlant(Number(id), name, notes, plantPicture || undefined);
      setIsEditing(false); // Once saved, the view will be switched to Detail mode
    } else {
      alert("Plant name is required"); // User will receive an alert if plant name is missing
    }
  };

  // Switching mode to Detail mode without saving changes
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Switching mode to Edit mode and using current plant data as a start point for editing
  const handleEdit = () => {
    setIsEditing(true);
    setName(plant?.name || "");
    setNotes(plant?.notes || "");
    setPlantPicture(plant?.plantPicture || null);
  };

  // Image picker from device storage or camera
  const pickImage = async () => {
    // Checking if the app is launched on the web
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
      {/* The content of the view is displayed according to the selected mode */}
      {isEditing ? (
        // Edit mode

        // Scroll view is used in case of keyboard extention
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
            placeholder="Plant Name"
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

          {/* Cancel button */}
          <TouchableOpacity onPress={handleCancel} style={themeCancelButton}>
            <Text style={themeButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Save button */}
          <TouchableOpacity onPress={handleSave} style={themeSaveButton}>
            <Text style={themeButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          {/* Scroll view is used to allow user read the plant details if their size is more than the device screen */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Date when the plant was added in US format */}
            <Text style={themeDateText}>Added: {formatDate(addedAt)}</Text>

            {/* If user added picture of the plant, it will be shown on the card. Otherwise, a placeholder will be displayed. */}
            {plant?.plantPicture ? (
              <Image
                source={{ uri: plant?.plantPicture }}
                style={styles.imageDetail}
              />
            ) : (
              <Image
                source={require("../../../../assets/images/plants.png")}
                style={styles.imageDetail}
              />
            )}

            {/* Plant name */}
            <Text style={themeNameText}>{plant?.name || ""}</Text>

            {/* If user added notes, they will be shown. Otherwise, nothing will be displayed. */}
            {plant?.notes ? (
              <Text style={themeNotesText}>{plant?.notes || ""}</Text>
            ) : (
              // An empty fragment is used in case of placeholder could be added
              <></>
            )}
          </ScrollView>
          {/* Edit button that switches the mode to Edit mode */}
          <TouchableOpacity onPress={handleEdit} style={themeButton}>
            <Text style={themeButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
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
  image: { width: imageWidth, height: imageWidth, borderRadius: 10 },
  lightImageText: { textAlign: "center", color: "#8E8C8E", fontSize: 18 },
  darkImageText: { textAlign: "center", color: "#8C8484", fontSize: 18 },
  lightNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "flex-start",
    color: "#949D6A",
  },
  darkNameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "flex-start",
    color: "#5A6340",
  },
  lightNotesText: {
    fontSize: 16,
    alignSelf: "flex-start",
    color: "#2A2B2E",
  },
  darkNotesText: {
    fontSize: 16,
    alignSelf: "flex-start",
    color: "#E9DEDD",
  },
  imageDetail: {
    width: imageWidth * 2 - 40,
    height: imageWidth * 2 - 40,
    borderRadius: 10,
  },
  lightDateText: {
    fontSize: 16,
    color: "#2A2B2E",
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  darkDateText: {
    fontSize: 16,
    color: "#E9DEDD",
    alignSelf: "flex-start",
    marginVertical: 10,
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
  lightCancelButton: {
    position: "absolute",
    bottom: 30,
    start: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2BB05",
    borderRadius: 10,
    alignSelf: "center",
  },
  darkCancelButton: {
    position: "absolute",
    bottom: 30,
    start: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B28500",
    borderRadius: 10,
    alignSelf: "center",
  },
  lightSaveButton: {
    position: "absolute",
    bottom: 30,
    end: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2BB05",
    borderRadius: 10,
    alignSelf: "center",
  },
  darkSaveButton: {
    position: "absolute",
    bottom: 30,
    end: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B28500",
    borderRadius: 10,
    alignSelf: "center",
  },
  lightButtonText: { color: "#2A2B2E", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#E9DEDD", fontSize: 16, fontWeight: "bold" },
});
