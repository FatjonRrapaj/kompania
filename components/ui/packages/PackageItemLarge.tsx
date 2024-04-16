import { gray } from "@/constants/Colors";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface PackageItemLargeProps {}

const PackageItemLarge = (props: PackageItemLargeProps) => {
  return (
    <View style={styles.container}>
      <Text>PackageItemLarge</Text>
    </View>
  );
};

export default PackageItemLarge;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: gray[500],
    borderRadius: 16,
    padding: 16,
  },
});
