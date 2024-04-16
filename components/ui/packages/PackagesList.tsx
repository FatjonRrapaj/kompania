import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";

import { observePackages } from "@/watermelon/operations/package";
import PackageModel from "@/watermelon/models/Package";

interface PackagesListProps {
  packages: PackageModel[];
}

const PackagesListComponent = (props: PackagesListProps) => {
  return (
    <View style={styles.container}>
      <Text>PackagesList</Text>
      <Text>
        {props?.packages ? JSON.stringify(props.packages) : "No Packages"}
      </Text>
    </View>
  );
};

const enhance = withObservables([], () => ({
  packages: observePackages(),
}));

const PackagesList = enhance(PackagesListComponent);

export default PackagesList;

const styles = StyleSheet.create({
  container: {},
});
