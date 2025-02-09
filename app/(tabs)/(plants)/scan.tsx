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
  const colorScheme = useColorScheme();

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
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={themeContainerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          multiline={false}
        />

        <TextInput
          placeholder="Notes (optional)"
          placeholderTextColor={themePlaceholderColor}
          value={notes}
          onChangeText={setNotes}
          style={themeNotesInput}
          multiline={true}
          scrollEnabled={true}
        />

        <TouchableOpacity onPress={handleSave} style={themeButton}>
          <Text style={themeButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth / 2;
const inputWidth = windowWidth - 40;

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#F1EDEE",
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 80,
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
