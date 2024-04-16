import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";

import { observePackages } from "@/watermelon/operations/package";
import PackageModel from "@/watermelon/models/Package";

interface PackagesListProps {
  packages: PackageModel[];
}

const PackagesListComponent = ({ packages }: PackagesListProps) => {
  return (
    <View style={styles.container}>
      <Text>PackagesList</Text>
      <FlashList
        data={packages}
        estimatedItemSize={packages.length}
        renderItem={({ item: packageObject }) => (
          <Text>{packageObject.packageName}</Text>
        )}
      />
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
