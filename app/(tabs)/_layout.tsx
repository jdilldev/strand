import { Tabs } from "expo-router";

import { TabIcon } from "@/components/navigation/TabIcon";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function TabLayout() {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor, // Active label color
        tabBarInactiveTintColor: "#888888", // Inactive label color
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "SourceSans3",
        },
        sceneStyle: {
          backgroundColor: primaryColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              size={28}
              icon={{ type: "material", name: "space-dashboard" }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color }) => (
            <TabIcon
              size={24}
              icon={{ type: "material", name: "folder" }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <TabIcon
              size={24}
              icon={{ type: "ant", name: "unordered-list" }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
