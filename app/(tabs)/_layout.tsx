import { Tabs } from "expo-router";
import React from "react";

import { TabIcon } from "@/components/navigation/TabIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={"space-dashboard"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
