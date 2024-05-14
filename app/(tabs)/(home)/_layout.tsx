import { Stack } from "expo-router";
import * as React from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

const IndexLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="createPackage"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
};

export default IndexLayout;
