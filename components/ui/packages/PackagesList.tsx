import * as React from "react";
import { StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";

import {
  observeAndFilterPackages,
  observePackages,
} from "@/watermelon/operations/package/getPackage";
import PackageModel from "@/watermelon/models/Package";
import PackageItemLarge from "./PackageItemLarge";
import { ListEmptyComponent } from "../home/PackageItem";
import { white } from "@/constants/Colors";
import { View } from "@/components/Themed";

interface PackagesListProps {
  packages: PackageModel[];
  filteredPackages: PackageModel[];
}

const PackagesListComponent = ({
  packages,
  filteredPackages,
}: PackagesListProps) => {
  if (!packages?.length) {
    return <ListEmptyComponent />;
  }

  return (
    <FlashList
      contentContainerStyle={{ paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      data={filteredPackages?.length ? filteredPackages : packages}
      estimatedItemSize={packages?.length}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item: packageObject }) => (
        <PackageItemLarge packageObject={packageObject} />
      )}
    />
  );
};

const enhance = withObservables(["searchTerm"], ({ searchTerm }) => ({
  packages: observePackages(),
  filteredPackages: observeAndFilterPackages(searchTerm ?? ""),
}));

const PackagesList = enhance(PackagesListComponent);

export default PackagesList;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
