import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import { Text, View, StyleSheet, Pressable } from "react-native";

import usePackageStore from "@/store/package";
import PackageModel from "@/watermelon/models/Package";
import { findAndObservePackage } from "@/watermelon/operations/package/getPackage";
import globalStyles from "@/components/globalStyles";
import { Body2Bold } from "@/components/StyledText";

interface PackageDetailsComponentProps {
  id: string;
  packageObject?: PackageModel;
}

const PackageDetailsComponent = ({
  packageObject,
}: PackageDetailsComponentProps) => {
  const isGoingBack = useRef<number>(0);
  const routeOrigin = usePackageStore((state) => state.packageRouteOrigin);

  useEffect(() => {
    isGoingBack.current++;
    return () => {
      if (isGoingBack.current > 1) {
        console.log("here");
        //useEffect renders 2 times
        usePackageStore.getState().setPackageRouteOrigin(undefined);
        usePackageStore.getState().setNewCreatedPackageId(undefined);
      }
    };
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <Pressable
        onPress={() => {
          router.replace(routeOrigin as any);
        }}
      >
        <Body2Bold>Go BACK</Body2Bold>
      </Pressable>
      <Text>{packageObject?.receiverName}</Text>
    </View>
  );
};

const enhance = withObservables(["id"], ({ id }) => ({
  packageObject: findAndObservePackage(id),
}));

const PackageDetails = enhance(PackageDetailsComponent);
export default PackageDetails;

const styles = StyleSheet.create({
  container: {},
});
