import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";

import { observePackages } from "@/watermelon/operations/package";
import PackageModel from "@/watermelon/models/Package";
import PackageItemLarge from "./PackageItemLarge";

interface PackagesListProps {
  packages: PackageModel[];
}

const PackagesListComponent = ({ packages }: PackagesListProps) => {
  return (
    <View style={styles.container}>
      <FlashList
        data={packages}
        estimatedItemSize={packages.length}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: packageObject }) => (
          <PackageItemLarge packageObject={packageObject} />
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
  container: { flex: 1 },
});
