import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface NotificationsProps {}

const Notifications = (props: NotificationsProps) => {
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {},
});
