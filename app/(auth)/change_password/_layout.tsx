import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

const ChangePasswordLayout = () => {
  return (
    <Stack
      initialRouteName="change_password"
      screenOptions={{ headerShown: false }}
    />
  );
};

export default ChangePasswordLayout;
