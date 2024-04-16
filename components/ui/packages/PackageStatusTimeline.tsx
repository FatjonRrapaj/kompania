import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface PackageStatusTimelineProps {}

const PackageStatusTimeline = (props: PackageStatusTimelineProps) => {
  return (
    <View style={styles.container}>
      <Text>PackageStatusTimeline</Text>
    </View>
  );
};

export default PackageStatusTimeline;

const styles = StyleSheet.create({
  container: {},
});
