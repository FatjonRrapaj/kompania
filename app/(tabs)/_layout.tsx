import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

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
          tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="stethoscope" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
