import { Slot, Stack } from "expo-router";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface AuthLayoutProps {}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {},
});
