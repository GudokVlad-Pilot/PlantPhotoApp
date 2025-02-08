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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "./plantContext/PlantContext";
import { useRouter } from "expo-router";

export default function ScanView() {
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
            style: "cancel",
            onPress: () => console.log("Image selection canceled."),
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new plant</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {plantPicture ? (
          <Image source={{ uri: plantPicture }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Add plant picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Plant name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: { width: 150, height: 150 },
  imageText: { textAlign: "center", color: "#000000" },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 16 },
});
