import React from "react";
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from "react-native";

interface CustomImagePickerProps {
  onPress: (event: GestureResponderEvent) => void;
  imagePickerText: string;
  image?: string | null;
  imagePickerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imagePickerTextStyle?: StyleProp<TextStyle>;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  onPress,
  imagePickerStyle,
  imageStyle,
  imagePickerTextStyle,
  image,
  imagePickerText,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={imagePickerStyle}>
      {/* If the picture is added, it will be shown in the box. Otherwise, a text will be displayed. */}
      {image ? (
        <Image source={{ uri: image }} style={imageStyle} />
      ) : (
        <Text style={imagePickerTextStyle}>{imagePickerText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
