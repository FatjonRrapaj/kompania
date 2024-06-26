import { useEffect } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { withObservables } from "@nozbe/watermelondb/react";

import { Company } from "@/api/company";
import useAuthStore from "@/store/auth";
import { PackageStatus } from "@/api/package";
import useCompanyStore from "@/store/company";
import { observeLastWeekPackages } from "@/watermelon/operations/package/getPackage";
import PackageModel from "@/watermelon/models/Package";
import {
  ItemLoaderList,
  ListEmptyComponent,
  SmallPackageItem,
} from "./PackageItem";
import GreetingComponent from "./Greeting";
import PackagesOverView from "./PackagesOverview";
import PackageActions from "./PackageActions";
import PackagesListHeader from "./PackagesListHeader";
import usePackageStore from "@/store/package";
import PlacesAutoComplete from "@/components/PlacesAutocomplete";

interface PackageListProps {
  packages: PackageModel[];
}

const PackagesListComponent = ({ packages }: PackageListProps) => {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    //TODO: go to packages w status filter as parameter
  };

  const user = useAuthStore((store) => store.user);
  const profile = useAuthStore((store) => store.profile);
  const loadingGetCompany = useCompanyStore((store) => store.loadingGetCompany);
  const company = useCompanyStore((store) => store.company as Company);
  const loadingPackages = usePackageStore((store) => store.loadingSyncPackages);

  useEffect(() => {
    if (user && !profile) {
      useAuthStore.getState().getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile && !company) {
      useCompanyStore.getState().getCompany();
    }
  }, [profile]);

  //TODO: add listEmptyComponent and list loader component better this has a reset ugly af kk?

  if (!packages?.length) {
    return (
      <>
        <GreetingComponent />
        <PackagesOverView
          company={company}
          loading={loadingGetCompany}
          onPackageTypePress={handlePackageOverviewPress}
        />
        <PackageActions />
        {packages?.length ? <PackagesListHeader /> : null}
        {loadingPackages ? <ItemLoaderList /> : <ListEmptyComponent />}
      </>
    );
  }

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item: packageObject }) => (
        <SmallPackageItem packageObject={packageObject} />
      )}
      estimatedItemSize={100}
      data={packages ?? []}
      ListHeaderComponent={
        <>
          <GreetingComponent />
          <PackagesOverView
            company={company}
            loading={loadingGetCompany}
            onPackageTypePress={handlePackageOverviewPress}
          />
          <PackageActions />
          {packages?.length ? <PackagesListHeader /> : null}
        </>
      }
    />
  );
};

const enhance = withObservables([], () => ({
  packages: observeLastWeekPackages(),
}));

const PackagesList = enhance(PackagesListComponent);
export default PackagesList;
