import { useState } from "react";
import { View, TextInput, Platform, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "./plantContext/PlantContext";
import { useRouter } from "expo-router";
import theme from "@/assets/styles/theme";
import CustomButton from "@/app/components/CustomButton";
import CustomImagePicker from "@/app/components/CustomImagePicker";

export default function ScanView() {
  // Theme defenition
  const style = theme();
  const placeholderColor = "gray";

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
      alert("Plant name is required"); // User will receive an alert if plant name is missing
    }
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
      {/* Scroll view is used in case of keyboard extention */}
      <ScrollView contentContainerStyle={style.scrollContainer}>
        {/* Image picker */}
        <CustomImagePicker
          onPress={pickImage}
          imagePickerStyle={style.imagePicker}
          imageStyle={style.image}
          imagePickerTextStyle={style.imagePickerText}
          image={plantPicture}
          imagePickerText={"Add plant picture (optional)"}
        />

        {/* Input field for plant name (one line field) */}
        <TextInput
          placeholder="Plant name"
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

        {/* Save button */}
        <CustomButton
          onPress={handleSave}
          buttonText="Save"
          buttonStyle={style.button}
          buttonTextStyle={style.buttonText}
        />
      </ScrollView>
    </View>
  );
}
