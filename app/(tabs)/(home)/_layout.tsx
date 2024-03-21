import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface IndexLayoutProps {}

export const unstable_settings = {
  initialRouteName: "index",
};

const IndexLayout = (props: IndexLayoutProps) => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
  );
};

export default IndexLayout;

const styles = StyleSheet.create({
  container: {},
});
