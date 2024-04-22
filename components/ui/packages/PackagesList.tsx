import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { FlashList } from "@shopify/flash-list";

import { observePackages } from "@/watermelon/operations/package/getPackage";
import PackageModel from "@/watermelon/models/Package";
import PackageItemLarge from "./PackageItemLarge";
import { ListEmptyComponent } from "../home/PackageItem";
import { white } from "@/constants/Colors";

interface PackagesListProps {
  packages: PackageModel[];
}

const PackagesListComponent = ({ packages }: PackagesListProps) => {
  if (!packages?.length) {
    return <ListEmptyComponent />;
  }

  return (
    <View style={{ backgroundColor: white[500], flex: 1 }}>
      <FlashList
        contentContainerStyle={{
          paddingHorizontal: 22,
          backgroundColor: white[500],
          paddingVertical: 24,
        }}
        showsVerticalScrollIndicator={false}
        data={packages}
        estimatedItemSize={packages?.length}
        keyExtractor={(item) => item.id}
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
