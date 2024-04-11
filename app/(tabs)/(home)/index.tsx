import { FlatList, StyleSheet } from "react-native";

import { View } from "@/components/Themed";

import globalStyles from "@/components/globalStyles";
import GreetingComponent from "@/components/ui/home/Greeting";
import PackagesOverView from "@/components/ui/home/PackagesOverview";
import PackageActions from "@/components/ui/home/PackageActions";

import { packagesMockList } from "@/mocks/packagesMock";
import {
  SmallPackageItem,
  ItemLoaderList,
  ListEmptyComponent,
} from "@/components/ui/home/PackageItem";
import PackagesListHeader from "@/components/ui/home/PackagesListHeader";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { PackageStatus } from "@/api/package";
import useCompanyStore from "@/store/company";
import { Company } from "@/api/company";

export default function HomeScreen() {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    //TODO: go to packages w status filter as parameter
  };

  const loadingPackages = false;
  const data = packagesMockList;
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
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <FlatList
        style={{ marginHorizontal: -3 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }, index) => index.toString()}
        renderItem={({ item: packageItem }) => (
          <SmallPackageItem {...packageItem} />
        )}
        data={data}
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
            {data?.length && <PackagesListHeader />}
          </View>
        }
      />
    </View>
  );
}
