import { findAndObservePackage } from "@/watermelon/operations/package/getPackage";
import { withObservables } from "@nozbe/watermelondb/react";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

const EditPackageComponent = () => {
  return (
    <View style={styles.container}>
      <Text>EditPackage</Text>
    </View>
  );
};

const enhance = withObservables(["id"], ({ id }) => ({
  packageObject: findAndObservePackage(id),
}));

const EditPackage = enhance(EditPackageComponent);
export default EditPackage;

const styles = StyleSheet.create({
  container: {},
});
