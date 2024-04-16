import PackageModel from "@/watermelon/models/Package";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  ItemLoaderList,
  ListEmptyComponent,
  SmallPackageItem,
} from "./PackageItem";
import GreetingComponent from "./Greeting";
import PackagesOverView from "./PackagesOverview";
import PackageActions from "./PackageActions";
import PackagesListHeader from "./PackagesListHeader";
import { Company } from "@/api/company";
import useAuthStore from "@/store/auth";
import { PackageStatus } from "@/api/package";
import useCompanyStore from "@/store/company";
import { withObservables } from "@nozbe/watermelondb/react";
import { observePackages } from "@/watermelon/operations/package";

interface PackageListProps {
  packages: PackageModel[];
}

const PackagesListComponent = ({ packages }: PackageListProps) => {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    //TODO: go to packages w status filter as parameter
  };

  const loadingPackages = false;
  const user = useAuthStore((store) => store.user);
  const profile = useAuthStore((store) => store.profile);
  const loadingGetCompany = useCompanyStore((store) => store.loadingGetCompany);
  const company = useCompanyStore((store) => store.company as Company);

  useEffect(() => {
    if (user && !profile) {
      useAuthStore.getState().getProfile();
    }
  }, [user]);

  useEffect(() => {
    // const superTestTimeStamp = Timestamp.fromMillis(
    //   Timestamp.now().seconds * 1000
    // ).toDate();
    if (profile && !company) {
      useCompanyStore.getState().getCompany();
    }
  }, [profile]);

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item: packageObject }) => (
        <SmallPackageItem packageObject={packageObject} />
      )}
      estimatedItemSize={packages.length}
      data={packages}
      ListEmptyComponent={
        loadingPackages ? <ItemLoaderList /> : <ListEmptyComponent />
      }
      ListHeaderComponent={
        <View style={{ marginHorizontal: 3 }}>
          <GreetingComponent />
          <PackagesOverView
            company={company}
            loading={loadingGetCompany}
            onPackageTypePress={handlePackageOverviewPress}
          />
          <PackageActions />
          {packages?.length && <PackagesListHeader />}
        </View>
      }
    />
  );
};

const enhance = withObservables([], () => ({
  packages: observePackages(),
}));

const PackagesList = enhance(PackagesListComponent);
export default PackagesList;
