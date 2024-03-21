import { Stack } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";

interface NotificationsLayoutProps {}

const NotificationsLayout = (props: NotificationsLayoutProps) => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default NotificationsLayout;

const styles = StyleSheet.create({
  container: {},
});
