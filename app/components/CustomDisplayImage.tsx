import React, { useEffect, useState } from "react";
import { StyleProp, Image, ImageStyle } from "react-native";

interface CustomDisplayImageProps {
  imagePredefined?: string | null;
  imageStyle?: StyleProp<ImageStyle>;
}

const CustomDisplayImage: React.FC<CustomDisplayImageProps> = ({
  imagePredefined,
  imageStyle,
}) => {
  const [picture, setPicture] = useState<string | null>(null);

  // If the image aready exists the component will take it
  useEffect(() => {
    if (imagePredefined) {
      setPicture(imagePredefined);
    }
  }, [imagePredefined]);

  // If user added a picture, it will be shown. Otherwise, a placeholder will be displayed.
  return picture ? (
    <Image source={{ uri: picture }} style={imageStyle} />
  ) : (
    <Image
      source={require("../../assets/images/plants.png")}
      style={imageStyle}
    />
  );
};

export default CustomDisplayImage;
