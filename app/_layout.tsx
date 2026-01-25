import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import "react-native-reanimated";

// Keep splash visible until fonts are ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "ArchivoNarrow-Regular": require("../assets/fonts/ArchivoNarrow-Regular.ttf"),
    "ArchivoNarrow-Medium": require("../assets/fonts/ArchivoNarrow-Medium.ttf"),
    "SourceSans3-Regular": require("../assets/fonts/SourceSans3-Regular.ttf"),
    "SourceSans3-Bold": require("../assets/fonts/SourceSans3-Bold.ttf"),
    "SourceSans3-Black": require("../assets/fonts/SourceSans3-Black.ttf"),
    "SourceSans3-Medium": require("../assets/fonts/SourceSans3-Medium.ttf"),
    "SourceSans3-Light": require("../assets/fonts/SourceSans3-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeProvider>
  );
}
