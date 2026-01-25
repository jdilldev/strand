import ThemedText from "@/components/ui/themed-text";
import { View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Loading...</ThemedText>
    </View>
  );
}
