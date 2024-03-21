import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface SettingsLayoutProps {}

const SettingsLayout = (props: SettingsLayoutProps) => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default SettingsLayout;

const styles = StyleSheet.create({
  container: {},
});
