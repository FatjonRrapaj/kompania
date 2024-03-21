import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface PackageLayoutProps {}

const PackageLayout = (props: PackageLayoutProps) => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default PackageLayout;

const styles = StyleSheet.create({
  container: {},
});
