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
  if (!packages?.length) {
    //TODO r
    return (
      <View>
        <Text>No packages!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={packages}
        estimatedItemSize={packages?.length}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
