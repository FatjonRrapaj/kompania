import { Stack } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ForgotPasswordLayoutProps {}

export const unstable_settings = {
  initialRouteName: "forgot_password",
};

const ForgotPasswordLayout = (props: ForgotPasswordLayoutProps) => {
  return (
    <Stack
      initialRouteName="forgot_password"
      screenOptions={{ headerShown: false }}
    />
  );
};

export default ForgotPasswordLayout;

const styles = StyleSheet.create({
  container: {},
});
