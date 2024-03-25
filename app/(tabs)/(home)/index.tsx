import { Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";

import globalStyles from "@/components/globalStyles";
import GreetingComponent from "@/components/ui/home/Greeting";
import PackagesOverView from "@/components/ui/home/PackagesOverview";
import PackageActions from "@/components/ui/home/PackageActions";

export default function TabOneScreen() {
  const handlePackageOverviewPress = (packageStatus: PackageStatus) => {
    console.log("packageStatus: ", packageStatus);
    //TODO: go to packages w status filter as parameter
  };

  return (
    <View style={globalStyles.screenContainer}>
      <GreetingComponent />
      <PackagesOverView
        totalPackages={10}
        processingPackages={123}
        problematicPackages={200}
        onPackageTypePress={handlePackageOverviewPress}
      />
      <PackageActions />
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
