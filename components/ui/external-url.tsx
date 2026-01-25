import { useCallback } from "react";
import { Alert, Linking, TouchableOpacity } from "react-native";
import ThemedText from "./themed-text";

export const NavigateToExternalLink = ({ url }: { url: string }) => {
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
      <ThemedText variant="h3"> Hyperlink to Pattern</ThemedText>
    </TouchableOpacity>
  );
};
