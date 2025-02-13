import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
  Button,
} from "react-native";
import { Link, router, useRouter } from "expo-router";
import { usePlants } from "./plantContext/PlantContext";
import { useNavigation } from "@react-navigation/native";
import theme from "@/assets/styles/theme";
import CustomButton from "@/app/components/CustomButton";

export default function ListView() {
  // Theme defenition
  const style = theme();

  // Context and navigation for the List View
  const { plants } = usePlants();
  const navigation = useNavigation();

  // Navigate to Scan View
  const handleToScan = () => {
    router.navigate("/scan");
  };

  // Formating the date to align US format
  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    // Preventing the navigation loop between the List, Scan and Detail View
    const backAction = () => {
      if (navigation.canGoBack()) {
        // If user can navigate back, they can use "back" button to return to the previous view
        return false;
      }

      // If user on the List View, the app will be closed
      BackHandler.exitApp();

      return true;
    };

    // "Back" button listener
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);

  return (
    <View style={style.container}>
      {/* The list with plant cards (grouped into two columns) */}
      <FlatList
        contentContainerStyle={style.listContainer}
        numColumns={2}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // Card as a link that allows user to navigate to Detail View
          <Link
            href={{
              pathname: "/plant/[id]",
              params: { id: item.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity style={style.card}>
              {/* If user added picture of the plant, it will be shown on the card. Otherwise, a placeholder will be displayed. */}
              {item.plantPicture ? (
                <Image
                  source={{ uri: item.plantPicture }}
                  style={style.cardImage}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/plants.png")}
                  style={style.cardImage}
                />
              )}

              {/* Plant name */}
              <Text style={style.cardText}>{item.name}</Text>

              {/* Date when the plant was added in US format */}
              {item.addedAt && (
                <Text style={style.cardDateText}>
                  Added: {formatDate(item.addedAt)}
                </Text>
              )}
            </TouchableOpacity>
          </Link>
        )}
      />

      {/* Button that allows user to navigate to Scan View to add new plant */}
      <CustomButton
        onPress={handleToScan}
        buttonText="Add Plant"
        buttonStyle={style.button}
        buttonTextStyle={style.buttonText}
      />
    </View>
  );
}
