import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
  useColorScheme,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { usePlants } from "./plantContext/PlantContext";
import { useNavigation } from "@react-navigation/native";

export default function ListView() {
  const colorScheme = useColorScheme(); // Detecting the device theme of a user

  // Style defenitions of the components for light/dark theme
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeCardStyle =
    colorScheme === "light" ? styles.lightCard : styles.darkCard;
  const themeCardText =
    colorScheme === "light" ? styles.lightCardText : styles.darkCardText;
  const themeDateText =
    colorScheme === "light" ? styles.lightDateText : styles.darkDateText;
  const themeButton =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;
  const themeButtonText =
    colorScheme === "light" ? styles.lightButtonText : styles.darkButtonText;

  // Context and navigation for the List View
  const { plants } = usePlants();
  const navigation = useNavigation();

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
    <View style={themeContainerStyle}>
      {/* The list with plant cards (grouped into two columns) */}
      <FlatList
        contentContainerStyle={styles.listContainer}
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
            <TouchableOpacity style={themeCardStyle}>
              {/* If user added picture of the plant, it will be shown on the card. Otherwise, a placeholder will be displayed. */}
              {item.plantPicture ? (
                <Image
                  source={{ uri: item.plantPicture }}
                  style={styles.plantImage}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/plants.png")}
                  style={styles.plantImage}
                />
              )}

              {/* Plant name */}
              <Text style={themeCardText}>{item.name}</Text>

              {/* Date when the plant was added in US format */}
              {item.addedAt && (
                <Text style={themeDateText}>
                  Added: {formatDate(item.addedAt)}
                </Text>
              )}
            </TouchableOpacity>
          </Link>
        )}
      />

      {/* Button that allows user to navigate to Scan View to add new plant */}
      <Link href="/scan" asChild>
        <TouchableOpacity style={themeButton}>
          <Text style={themeButtonText}>Add Plant</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Window/screen dimensions calculations
const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 60) / 2;

// Styles for the components
const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-between",
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  lightCard: {
    backgroundColor: "lightgray", // Basic color looks better
    width: cardWidth,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    padding: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  darkCard: {
    backgroundColor: "#E9DEDD",
    width: cardWidth,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    padding: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  lightCardText: { fontSize: 18, color: "#2A2B2E", marginVertical: 10 },
  darkCardText: { fontSize: 18, color: "#2E2A2B", marginVertical: 10 },
  plantImage: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: 10,
  },
  lightButton: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2BB05",
    borderRadius: 10,
    alignSelf: "center",
  },
  darkButton: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B28500",
    borderRadius: 10,
    alignSelf: "center",
  },
  lightButtonText: { color: "2A2B2E", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#E9DEDD", fontSize: 16, fontWeight: "bold" },
  lightDateText: {
    fontSize: 12,
    color: "#2A2B2E",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  darkDateText: {
    fontSize: 12,
    color: "#2E2A2B",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  lightContainer: {
    backgroundColor: "#F1EDEE",
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
    flex: 1,
  },
  lightThemeText: {
    color: "#2A2B2E",
  },
  darkThemeText: {
    color: "#D7CDCC",
  },
});
