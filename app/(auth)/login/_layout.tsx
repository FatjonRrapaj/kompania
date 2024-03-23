import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface LoginLayoutProps {}

export const unstable_settings = {
  initialRouteName: "login",
};

const LoginLayout = (props: LoginLayoutProps) => {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
  );
};

export default LoginLayout;

const styles = StyleSheet.create({
  container: {},
});
