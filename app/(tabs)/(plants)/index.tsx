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

  const { plants } = usePlants();
  const navigation = useNavigation();
  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
              {item.plantPicture && (
                <Image
                  source={{ uri: item.plantPicture }}
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Plant</Text>
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
  lightCardText: { fontSize: 18, color: "#2A2B2E" },
  darkCardText: { fontSize: 18, color: "#2E2A2B" },
  plantImage: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16 },
  lightDateText: { fontSize: 12, color: "#2A2B2E" },
  darkDateText: { fontSize: 12, color: "#2E2A2B" },
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
