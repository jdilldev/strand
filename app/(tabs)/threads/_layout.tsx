import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";

export default function ThreadsStackLayout() {
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: primaryColor },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontFamily: "SourceSans3-Bold",
        },
        contentStyle: { backgroundColor: primaryColor },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Library" }} />
      <Stack.Screen name="[brand]/[id]" options={{ title: "Thread Details" }} />
    </Stack>
  );
}
