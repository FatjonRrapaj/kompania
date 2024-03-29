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
import { auth } from "@/utils/firebase";
import { PackageStatus } from "@/api/package";

export default function HomeScreen() {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    //TODO: go to packages w status filter as parameter
  };

  const loadingPackages = false;
  const data = packagesMockList;
  const user = useAuthStore((store) => store.user);
  const profile = useAuthStore((store) => store.profile);
  const loadingGetProfile = useAuthStore((store) => store.loadingGetProfile);

  useEffect(() => {
    console.log("auth?.currentUser: ", auth?.currentUser);
    if (auth?.currentUser && !user) {
      console.log("auth?.currentUser: ", auth?.currentUser);
      useAuthStore.getState().getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      //TODO: get company now
    }
  }, [profile, loadingGetProfile]);

  console.log("profile: ", profile);

  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <FlatList
        style={{ marginHorizontal: -3 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid!}
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
              totalPackages={10}
              processingPackages={123}
              problematicPackages={200}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
