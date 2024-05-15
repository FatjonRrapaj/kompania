import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useSegments } from "expo-router";

import Colors, { primary } from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import IconConfig from "@/assets/svg/IconConfig";

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
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconConfig.Home fill={color} />,
          // tabBarStyle: {
          //   // height: segment[2] === "createPackage" ? 0 : 60,
          //   // opacity: segment[2] === "createPackage" ? 0 : 1,
          //   // // display: segment[2] === "createPackage" ? "hidden" : "flex",
          // },
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconConfig.PackageNav stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="(package)"
        options={{
          title: "",
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconConfig.Notifications stroke={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconConfig.Settings stroke={color} />,
        }}
      />
    </Tabs>
  );
}
