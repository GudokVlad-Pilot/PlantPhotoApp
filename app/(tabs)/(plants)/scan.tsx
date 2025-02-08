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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "./plantContext/PlantContext";
import { useRouter } from "expo-router";

export default function ScanView() {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeImagePicker =
    colorScheme === "light" ? styles.lightImagePicker : styles.darkImagePicker;
  const themeImageText =
    colorScheme === "light" ? styles.lightImageText : styles.darkImageText;
    const themeInput =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
    const themePlaceholderColor =
    colorScheme === "light" ? "#2A2B2E" : "#E9DEDD";

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [plantPicture, setPlantPicture] = useState<string | null>(null);
  const { addPlant } = usePlants();
  const router = useRouter();

  const handleSave = () => {
    if (name.trim() !== "") {
      addPlant(name, notes.trim() || undefined, plantPicture || undefined);
      router.back();
    } else {
      alert("Plant name is required");
    }
  };

  const pickImage = async () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setPlantPicture(reader.result as string);
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      Alert.alert(
        "Select Plant Picture",
        "Add photo from Camera or Gallery",
        [
          {
            text: "Camera",
            onPress: async () => {
              const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
              if (status !== "granted") {
                alert("Permission to access camera is required!");
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });

              if (!result.canceled && result.assets.length > 0) {
                setPlantPicture(result.assets[0].uri);
              }
            },
          },
          {
            text: "Gallery",
            onPress: async () => {
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Permission to access gallery is required!");
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });

              if (!result.canceled && result.assets.length > 0) {
                setPlantPicture(result.assets[0].uri);
              }
            },
          },
          {
            text: "Close",
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={themeContainerStyle}>
      <TouchableOpacity onPress={pickImage} style={themeImagePicker}>
        {plantPicture ? (
          <Image source={{ uri: plantPicture }} style={styles.image} />
        ) : (
          <Text style={themeImageText}>Add plant picture (optional)</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Plant name"
        placeholderTextColor={themePlaceholderColor}
        value={name}
        onChangeText={setName}
        style={themeInput}
        multiline={true}
      />

      <TextInput
        placeholder="Notes (optional)"
        placeholderTextColor={themePlaceholderColor}
        value={notes}
        onChangeText={setNotes}
        style={themeInput}
        multiline={true}
      />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth / 2;

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#F1EDEE",
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lightImagePicker: {
    width: imageWidth,
    height: imageWidth,
    borderWidth: 1,
    borderColor: "#2A2B2E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  darkImagePicker: {
    width: imageWidth,
    height: imageWidth,
    borderWidth: 1,
    borderColor: "#E9DEDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  lightImageText: { textAlign: "center", color: "#2A2B2E", fontSize: 18 },
  darkImageText: { textAlign: "center", color: "#E9DEDD", fontSize: 18 },
  image: { width: imageWidth, height: imageWidth, borderRadius: 10 },
  lightInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#2A2B2E",
    color: "#2A2B2E",
    borderRadius: 5,
    marginBottom: 15,
  },
  darkInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E9DEDD",
    color: "#E9DEDD",
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16 },
});
