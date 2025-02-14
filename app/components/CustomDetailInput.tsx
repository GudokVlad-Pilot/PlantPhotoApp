import React from "react";
import { StyleProp, TextStyle, TextInput } from "react-native";

interface CustomDetailInputProps {
  placeholderColor: string;
  plantName: string;
  plantNotes: string;
  setPlantName: (text: string) => void;
  setPlantNotes: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  notesInputStyle?: StyleProp<TextStyle>;
}

const CustomDetailInput: React.FC<CustomDetailInputProps> = ({
  placeholderColor,
  plantName,
  plantNotes,
  setPlantName,
  setPlantNotes,
  inputStyle,
  notesInputStyle,
}) => {
  return (
    <>
      {/* Input field for plant name (one line field) */}
      <TextInput
        placeholder="Plant name"
        placeholderTextColor={placeholderColor}
        value={plantName}
        onChangeText={setPlantName}
        style={inputStyle}
        multiline={false}
      />

      {/* Input field for notes (multiline scrollable field) */}
      <TextInput
        placeholder="Notes (optional)"
        placeholderTextColor={placeholderColor}
        value={plantNotes}
        onChangeText={setPlantNotes}
        style={notesInputStyle}
        multiline={true}
        scrollEnabled={true}
      />
    </>
  );
};

export default CustomDetailInput;
