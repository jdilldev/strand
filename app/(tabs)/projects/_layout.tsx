// app/(tabs)/projects/_layout.tsx
import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";

export default function ProjectsStackLayout() {
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
      {/* Project list screen */}
      <Stack.Screen name="index" options={{ title: "Projects" }} />

      {/* Project details screen */}
      <Stack.Screen
        name="project-details"
        options={{ title: "Project Details" }}
      />
    </Stack>
  );
}
