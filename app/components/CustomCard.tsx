import React from "react";
import {
  Text,
  StyleProp,
  TextStyle,
  Image,
  ImageStyle,
} from "react-native";
import { Plant } from "../(tabs)/(plants)/plantContext/PlantContext"

interface CustomCardProps {
  item: Plant;
  cardTextStyle?: StyleProp<TextStyle>;
  cardDateTextStyle?: StyleProp<TextStyle>;
  cardImageStyle?: StyleProp<ImageStyle>;
}

// Formating the date to align US format
const formatDate = (date: string | Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CustomCard: React.FC<CustomCardProps> = ({
  cardTextStyle,
  cardDateTextStyle,
  cardImageStyle,
  item,
}) => {
  return (
    <>
      {/* If user added picture of the plant, it will be shown on the card. Otherwise, a placeholder will be displayed. */}
      {item.plantPicture ? (
        <Image source={{ uri: item.plantPicture }} style={cardImageStyle} />
      ) : (
        <Image
          source={require("../../assets/images/plants.png")}
          style={cardImageStyle}
        />
      )}

      {/* Plant name */}
      <Text style={cardTextStyle}>{item.name}</Text>

      {/* Date when the plant was added in US format */}
      {item.addedAt && (
        <Text style={cardDateTextStyle}>Added: {formatDate(item.addedAt)}</Text>
      )}
    </>
  );
};

export default CustomCard;
