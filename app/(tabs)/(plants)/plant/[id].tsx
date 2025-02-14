import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { usePlants } from "../plantContext/PlantContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import theme from "@/assets/styles/theme";
import CustomButton from "@/app/components/CustomButton";
import CustomImagePicker from "@/app/components/CustomImagePicker";
import CustomDetailInput from "@/app/components/CustomDetailInput";

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
      Alert.alert(
        "Warning", // Making alert not too agressive
        "Please, enter the plant name"
      ); // User will receive an alert if plant name is missing
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

  return (
    <View style={style.container}>
      {/* The content of the view is displayed according to the selected mode */}
      {isEditing ? (
        // Edit mode

        // Scroll view is used in case of keyboard extention
        <ScrollView contentContainerStyle={style.scrollContainer}>
          {/* Image picker */}
          <CustomImagePicker
            imageCase={"Plant"}
            imagePickerStyle={style.imagePicker}
            imageStyle={style.image}
            imagePickerTextStyle={style.imagePickerText}
            imagePickerText={"Add plant picture (optional)"}
            imagePredefined={plant?.plantPicture}
            onImageSelected={(imageUri) => setPlantPicture(imageUri)}
          />

          {/* Input fields for plant details */}
          <CustomDetailInput
            placeholderColor={placeholderColor}
            plantName={name}
            plantNotes={notes}
            setPlantName={setName}
            setPlantNotes={setNotes}
            inputStyle={style.input}
            notesInputStyle={style.notesInput}
          />

          {/* Cancel button */}
          <CustomButton
            onPress={handleCancel}
            buttonText="Cancel"
            buttonStyle={style.cancelButton}
            buttonTextStyle={style.buttonText}
          />

          {/* Save button */}
          <CustomButton
            onPress={handleSave}
            buttonText="Save"
            buttonStyle={style.saveButton}
            buttonTextStyle={style.buttonText}
          />
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
          <CustomButton
            onPress={handleEdit}
            buttonText="Edit"
            buttonStyle={style.button}
            buttonTextStyle={style.buttonText}
          />
        </>
      )}
    </View>
  );
}
