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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePlants } from "../plantContext/PlantContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DetailView() {
  const { id } = useLocalSearchParams();
  const { plants, updatePlant } = usePlants();
  const plant = plants.find((plant) => plant.id === Number(id));
  const [name, setName] = useState(plant?.name || "");
  const [notes, setNotes] = useState(plant?.notes || "");
  const [plantPicture, setPlantPicture] = useState<string | null>(
    plant?.plantPicture || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant details</Text>
      {isEditing ? (
        <>
          <TextInput
            placeholder="Plant Name"
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

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {plantPicture ? (
              <Image source={{ uri: plantPicture }} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>Add plant picture</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>Plant name: {name}</Text>

          {notes ? <Text style={styles.text}>Notes: {notes}</Text> : <></>}

          {plantPicture ? (
            <Image source={{ uri: plantPicture }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>No plant picture</Text>
          )}

          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
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
    borderColor: "#000000",
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "#000000",
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
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#FFFFFF" },
  text: { fontSize: 18, marginBottom: 10 },
});
