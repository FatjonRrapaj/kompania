import { FlatList, StyleSheet } from "react-native";

import { View } from "@/components/Themed";

import globalStyles from "@/components/globalStyles";
import GreetingComponent from "@/components/ui/home/Greeting";
import PackagesOverView from "@/components/ui/home/PackagesOverview";
import PackageActions from "@/components/ui/home/PackageActions";

import { packagesMockList } from "@/mocks/packagesMock";
import { Body1 } from "@/components/StyledText";
import {
  SmallPackageItem,
  SmallPackageItemLoader,
} from "@/components/ui/home/PackageItem";
import HelloWorld from "@/components/ui/home/PackageListLoader";

export default function TabOneScreen() {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    console.log("packageStatus: ", packageStatus);
    //TODO: go to packages w status filter as parameter
  };

  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <FlatList
        style={{ marginHorizontal: -3 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid!}
        renderItem={({ item: packageItem, index }) => (
          <SmallPackageItem {...packageItem} />
        )}
        data={[]}
        ListEmptyComponent={<SmallPackageItemLoader />}
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
