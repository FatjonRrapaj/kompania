import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface RegisterLayoutProps {}

export const unstable_settings = {
  initialRouteName: "Register",
};

const RegisterLayout = (props: RegisterLayoutProps) => {
  return (
    <Stack initialRouteName="Register" screenOptions={{ headerShown: false }} />
  );
};

export default RegisterLayout;

const styles = StyleSheet.create({
  container: {},
});
