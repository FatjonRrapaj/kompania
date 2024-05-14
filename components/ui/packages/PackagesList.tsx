import * as React from "react";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";

import {
  observeAndFilterPackages,
  observePackages,
} from "@/watermelon/operations/package/getPackage";
import PackageModel from "@/watermelon/models/Package";
import PackageItemLarge from "./PackageItemLarge";
import { ListEmptyComponent } from "../home/PackageItem";
import { View } from "@/components/Themed";

interface PackagesListProps {
  packages: PackageModel[];
  filteredPackages: PackageModel[];
  searchTerm: string;
}

const PackagesListComponent = ({
  packages,
  filteredPackages,
  searchTerm,
}: PackagesListProps) => {
  if (!packages?.length) {
    return <ListEmptyComponent />;
  }

  return (
    <FlashList
      contentContainerStyle={{ paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
      data={searchTerm ? filteredPackages : packages}
      estimatedItemSize={packages?.length}
      keyExtractor={(item) => item.id}
      renderItem={({ item: packageObject }) => (
        <PackageItemLarge packageObject={packageObject} />
      )}
    />
  );
};

const enhance = withObservables(["searchTerm"], ({ searchTerm }) => ({
  packages: observePackages(),
  filteredPackages: observeAndFilterPackages(searchTerm),
}));

const PackagesList = enhance(PackagesListComponent);

export default PackagesList;
