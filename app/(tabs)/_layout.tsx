import { Tabs } from "expo-router";
import React from "react";

import { TabIcon } from "@/components/navigation/TabIcon";

export default function TabLayout() {
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
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color }) => (
            <TabIcon
              size={28}
              icon={{ type: "feather", name: "shopping-cart" }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabIcon
              size={28}
              icon={{ type: "feather", name: "search" }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
