import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface PackagesLayoutProps {}

const PackagesLayout = (props: PackagesLayoutProps) => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default PackagesLayout;

const styles = StyleSheet.create({
  container: {},
});
