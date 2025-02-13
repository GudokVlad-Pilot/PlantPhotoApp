import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "../plantContext/PlantContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import theme from "@/assets/styles/theme";

export default function DetailView() {
  // Theme defenition
  const style = theme();
  const placeholderColor = "gray";

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
    <View style={style.container}>
      {/* The content of the view is displayed according to the selected mode */}
      {isEditing ? (
        // Edit mode

        // Scroll view is used in case of keyboard extention
        <ScrollView contentContainerStyle={style.scrollContainer}>
          {/* Image picker */}
          <TouchableOpacity onPress={pickImage} style={style.imagePicker}>
            {/* If the picture is added, it will be shown in the box. Otherwise, a text will be displayed. */}
            {plantPicture ? (
              <Image source={{ uri: plantPicture }} style={style.image} />
            ) : (
              <Text style={style.imagePickerText}>
                Add plant picture (optional)
              </Text>
            )}
          </TouchableOpacity>

          {/* Input field for plant name (one line field) */}
          <TextInput
            placeholder="Plant Name"
            placeholderTextColor={placeholderColor}
            value={name}
            onChangeText={setName}
            style={style.input}
            multiline={false}
          />

          {/* Input field for notes (multiline scrollable field) */}
          <TextInput
            placeholder="Notes (optional)"
            placeholderTextColor={placeholderColor}
            value={notes}
            onChangeText={setNotes}
            style={style.notesInput}
            multiline={true}
            scrollEnabled={true}
          />

          {/* Cancel button */}
          <TouchableOpacity onPress={handleCancel} style={style.cancelButton}>
            <Text style={style.buttonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Save button */}
          <TouchableOpacity onPress={handleSave} style={style.saveButton}>
            <Text style={style.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          {/* Scroll view is used to allow user read the plant details if their size is more than the device screen */}
          <ScrollView contentContainerStyle={style.scrollContainer}>
            {/* Date when the plant was added in US format */}
            <Text style={style.detailDateText}>
              Added: {formatDate(addedAt)}
            </Text>

            {/* If user added picture of the plant, it will be shown on the card. Otherwise, a placeholder will be displayed. */}
            {plant?.plantPicture ? (
              <Image
                source={{ uri: plant?.plantPicture }}
                style={style.detailImage}
              />
            ) : (
              <Image
                source={require("../../../../assets/images/plants.png")}
                style={style.detailImage}
              />
            )}

            {/* Plant name */}
            <Text style={style.detailName}>{plant?.name || ""}</Text>

            {/* If user added notes, they will be shown. Otherwise, nothing will be displayed. */}
            {plant?.notes ? (
              <Text style={style.detailNotes}>{plant?.notes || ""}</Text>
            ) : (
              // An empty fragment is used in case of placeholder could be added
              <></>
            )}
          </ScrollView>
          {/* Edit button that switches the mode to Edit mode */}
          <TouchableOpacity onPress={handleEdit} style={style.button}>
            <Text style={style.buttonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
