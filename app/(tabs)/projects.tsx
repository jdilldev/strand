import React, { useCallback } from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PROJECTS = [
  { id: "1", name: "Apple", threads: [], thumbnail: "" },
  { id: "2", name: "Banana", threads: [], thumbnail: "" },
  { id: "3", name: "Orange", threads: [], thumbnail: "" },
  { id: "4", name: "Mango", threads: [], thumbnail: "" },
  { id: "5", name: "Pineapple", threads: [], thumbnail: "" },
];

const NavigateToPattern = ({ url }: { url: string }) => {
  const handlePress = useCallback(async () => {
    // Check if the device can open the URL (recommended)
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL in the default browser
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{}}> Hyperlink to Pattern</Text>
    </TouchableOpacity>
  );
};

export default function ProjectsList() {
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; threads: any[]; thumbnail: string };
  }) => (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={{ width: 60, height: 60 }}
      />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  // Julia Sans 1 - H1

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ display: "flex", flex: 1, padding: 16 }}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 18 }}>Projects</Text>
        <FlatList
          data={PROJECTS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        /> */}
        <Text style={{ textAlign: "center" }}>My Projects</Text>
        <Text>Name of Project</Text>
        <Text style={{ fontStyle: "italic" }}>Completion Date: 10/15/2025</Text>

        <NavigateToPattern url={"https://example.com/pattern/"} />
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={{ width: "100%", height: "20%" }}
        />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "lightgray",
            padding: 10,
            marginTop: 10,
          }}
        ></View>
      </SafeAreaView>
      {/* Get the root page and render heading (should be dynamic and not hardcoded) */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
  },
});
