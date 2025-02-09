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
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeButton =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;
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

  const { id } = useLocalSearchParams();
  const { plants, updatePlant } = usePlants();
  const plant = plants.find((plant) => plant.id === Number(id));
  const [addedAt, setAddedAt] = useState(plant?.addedAt || "");
  const [name, setName] = useState(plant?.name || "");
  const [notes, setNotes] = useState(plant?.notes || "");
  const [plantPicture, setPlantPicture] = useState<string | null>(
    plant?.plantPicture || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setNotes(plant.notes || "");
      setPlantPicture(plant.plantPicture || null);
    }
  }, [plant]);

  const handleSave = () => {
    if (name.trim() !== "") {
      updatePlant(Number(id), name, notes, plantPicture || undefined);
      setIsEditing(false);
    } else {
      alert("Plant name is required");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
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
      {isEditing ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity onPress={pickImage} style={themeImagePicker}>
            {plantPicture ? (
              <Image source={{ uri: plantPicture }} style={styles.image} />
            ) : (
              <Text style={themeImageText}>Add plant picture</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Plant Name"
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
            <Text style={themeButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={themeDateText}>Added: {formatDate(addedAt)}</Text>

            {plantPicture ? (
              <Image
                source={{ uri: plantPicture }}
                style={styles.imageDetail}
              />
            ) : (
              <Image
                source={require("../../../../assets/images/plants.png")}
                style={styles.imageDetail}
              />
            )}

            <Text style={themeNameText}>{name}</Text>

            {notes ? (
              <>
                <Text style={themeNotesText}>{notes}</Text>
              </>
            ) : (
              <></>
            )}
          </ScrollView>
          <TouchableOpacity onPress={handleEdit} style={themeButton}>
            <Text style={themeButtonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingBottom: 100,
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
  lightButtonText: { color: "#2A2B2E", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#E9DEDD", fontSize: 16, fontWeight: "bold" },
});
