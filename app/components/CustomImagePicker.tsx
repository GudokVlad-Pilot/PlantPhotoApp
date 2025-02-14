import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface CustomImagePickerProps {
  imageCase: string;
  imagePickerText: string;
  imagePickerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imagePickerTextStyle?: StyleProp<TextStyle>;
  imagePredefined?: string | null;
  onImageSelected?: (imageUri: string | null) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  imageCase,
  imagePickerStyle,
  imageStyle,
  imagePickerTextStyle,
  imagePickerText,
  imagePredefined,
  onImageSelected,
}) => {
  const [picture, setPicture] = useState<string | null>(null);

  // If the image aready exists the picker will take it
  useEffect(() => {
    if (imagePredefined) {
      setPicture(imagePredefined);
    }
  }, [imagePredefined]);

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
          reader.onload = () => {
            const imageUri = reader.result as string;
            setPicture(imageUri);
            onImageSelected?.(imageUri); // Pass the selected image to parent
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // If the app is launched on mobile device, it creates alert
      Alert.alert(
        `Select ${imageCase} Picture`, // The case is used to inform user which picture is modifying. In the future picker could be used for profile, for example
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
                const imageUri = result.assets[0].uri;
                setPicture(imageUri);
                onImageSelected?.(imageUri); // Pass the selected image to parent
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
                const imageUri = result.assets[0].uri;
                setPicture(imageUri);
                onImageSelected?.(imageUri); // Pass the selected image to parent
              }
            },
          },
        ],
        { cancelable: true } // Alert can be closed by clicking outside the box or "back" button
      );
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={imagePickerStyle}>
      {/* If the picture is added, it will be shown in the box. Otherwise, a text will be displayed. */}
      {picture ? (
        <Image source={{ uri: picture }} style={imageStyle} />
      ) : (
        <Text style={imagePickerTextStyle}>{imagePickerText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
