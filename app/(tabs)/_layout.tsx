import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useSegments } from "expo-router";

import Colors, { primary } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segment = useSegments();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary[500],
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconStroke,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarStyle: {
            display: segment[2] === "createPackage" ? "none" : "flex",
          },
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="lightbulb-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="wrench" color={color} />,
        }}
      />
    </Tabs>
  );
}
