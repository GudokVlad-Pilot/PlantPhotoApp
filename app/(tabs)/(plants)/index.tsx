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
  const colorScheme = useColorScheme();

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

  const { plants } = usePlants();
  const navigation = useNavigation();
  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        return false;
      }

      BackHandler.exitApp();

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);

  return (
    <View style={themeContainerStyle}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/plant/[id]",
              params: { id: item.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity style={themeCardStyle}>
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
              <Text style={themeCardText}>{item.name}</Text>
              {item.addedAt && (
                <Text style={themeDateText}>
                  Added: {formatDate(item.addedAt)}
                </Text>
              )}
            </TouchableOpacity>
          </Link>
        )}
      />

      <Link href="/scan" asChild>
        <TouchableOpacity style={themeButton}>
          <Text style={themeButtonText}>Add Plant</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 60) / 2;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  lightCard: {
    backgroundColor: "lightgray", // Basic color looks better
    width: cardWidth,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  darkCard: {
    backgroundColor: "#E9DEDD",
    width: cardWidth,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    padding: 10,
    margin: 5,
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
    position: 'absolute',
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2BB05",
    borderRadius: 10,
    alignSelf: "center",
  },
  darkButton: {
    position: 'absolute',
    bottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B28500",
    borderRadius: 10,
    alignSelf: "center",
  },
  lightButtonText: { color: "2A2B2E", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#E9DEDD", fontSize: 16, fontWeight: "bold" },
  lightDateText: { fontSize: 12, color: "#2A2B2E", alignSelf: "flex-end", marginTop: "auto"  },
  darkDateText: { fontSize: 12, color: "#2E2A2B", alignSelf: "flex-end", marginTop: "auto"  },
  lightContainer: {
    backgroundColor: "#F1EDEE",
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#2E2A2B",
    flex: 1,
    padding: 20,
  },
  lightThemeText: {
    color: "#2A2B2E",
  },
  darkThemeText: {
    color: "#D7CDCC",
  },
});
