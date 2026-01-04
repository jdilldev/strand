import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ThreadDetailScreen() {
  const { brand, id } = useLocalSearchParams<{ brand: string; id: string }>();

  console.log("Thread detail mounted", brand, id);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Brand: {brand}</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
