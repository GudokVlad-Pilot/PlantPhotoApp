import React from "react";
import {
  Text,
  StyleProp,
  TextStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Plant } from "../(tabs)/(plants)/plantContext/PlantContext";
import { Link } from "expo-router";

interface CustomCardProps {
  item: Plant;
  cardStyle?: StyleProp<ViewStyle>;
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

const CustomPlantCard: React.FC<CustomCardProps> = ({
  cardStyle,
  cardTextStyle,
  cardDateTextStyle,
  cardImageStyle,
  item,
}) => {
  return (
    <Link
      href={{
        pathname: "/plant/[id]",
        params: { id: item.id.toString() },
      }}
      asChild
    >
      <TouchableOpacity style={cardStyle}>
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
          <Text style={cardDateTextStyle}>
            Added: {formatDate(item.addedAt)}
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default CustomPlantCard;
