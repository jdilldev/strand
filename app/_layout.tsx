import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [fontsLoaded] = useFonts({
    "SourceSans3-Bold": require("../assets/fonts/SourceSans3-Bold.ttf"),
    "SourceSans3-ExtraBold": require("../assets/fonts/SourceSans3-ExtraBold.ttf"),
    "SourceSans3-Black": require("../assets/fonts/SourceSans3-Black.ttf"),
    SourceSans3: require("../assets/fonts/SourceSans3-Regular.ttf"),
    "SourceSans3-ExtraLight": require("../assets/fonts/SourceSans3-ExtraLight.ttf"),
    "SourceSans3-Light": require("../assets/fonts/SourceSans3-Light.ttf"),
    "SourceSans3-Medium": require("../assets/fonts/SourceSans3-Medium.ttf"),
    "ArchivoNarrow-Bold": require("../assets/fonts/ArchivoNarrow-Bold.ttf"),
    "ArchivoNarrow-SemiBold": require("../assets/fonts/ArchivoNarrow-SemiBold.ttf"),
    "ArchivoNarrow-Medium": require("../assets/fonts/ArchivoNarrow-Medium.ttf"),
    ArchivoNarrow: require("../assets/fonts/ArchivoNarrow-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : primaryColor,
          },
          headerTintColor: colorScheme === "dark" ? "#fff" : textColor,
          headerTitle: "Home",
          headerTitleStyle: {
            fontFamily: "SourceSans3-Black",
          },
          drawerLabelStyle: {
            color: textColor,
            fontFamily: "SourceSans3-Bold",
          },
          drawerContentStyle: {
            backgroundColor: primaryColor,
          },
        }}
      >
        {/* Main Tabs */}
        <Drawer.Screen
          name="HomeTabs"
          options={{
            title: "Home",
          }}
        >
          {() => (
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          )}
        </Drawer.Screen>

        {/* Additional Drawer Screens */}
        <Drawer.Screen name="Settings" options={{ title: "Settings" }}>
          {() => (
            <Stack>
              <Stack.Screen name="settings" options={{ title: "Settings" }} />
            </Stack>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
      <StatusBar />
    </ThemeProvider>
  );
}
