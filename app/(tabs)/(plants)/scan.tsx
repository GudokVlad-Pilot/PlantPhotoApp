import { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { usePlants } from "./plantContext/PlantContext";
import { useRouter } from "expo-router";
import theme from "@/assets/styles/theme";
import CustomButton from "@/app/components/CustomButton";
import CustomImagePicker from "@/app/components/CustomImagePicker";
import CustomDetailInput from "@/app/components/CustomDetailInput";

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
      Alert.alert(
        "Plant Name Required", // Making alert not too agressive
        "Please, enter the name your plant"
      ); // User will receive an alert if plant name is missing
    }
  };

  return (
    <View style={style.container}>
      {/* Scroll view is used in case of keyboard extention */}
      <ScrollView contentContainerStyle={style.scrollContainer}>
        {/* Image picker */}
        <CustomImagePicker
          imageCase={"Plant"}
          imagePickerStyle={style.imagePicker}
          imageStyle={style.image}
          imagePickerTextStyle={style.imagePickerText}
          imagePickerText={"Add plant picture (optional)"}
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
