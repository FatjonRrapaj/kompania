import { Slot, Stack } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface AuthLayoutProps {}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="change_password" options={{ headerShown: false }} />
      <Stack.Screen name="forgot_password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {},
});
