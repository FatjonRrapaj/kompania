import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import { Text, View, StyleSheet } from "react-native";

import usePackageStore from "@/store/package";
import PackageModel from "@/watermelon/models/Package";
import { findAndObservePackage } from "@/watermelon/operations/package/getPackage";
import globalStyles from "@/components/globalStyles";
import { Body2Bold } from "@/components/StyledText";
import Pressable from "@/components/Pressable";
import PageHeader from "@/components/PageHeader";

interface PackageDetailsComponentProps {
  id: string;
  packageObject?: PackageModel;
}

const PackageDetailsComponent = ({
  packageObject,
}: PackageDetailsComponentProps) => {
  const goingBackTimeout = useRef<NodeJS.Timeout>();
  const routeOrigin = usePackageStore((state) => state.packageRouteOrigin);

  useEffect(() => {
    return () => {
      clearTimeout(goingBackTimeout.current);
    };
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <PageHeader
        title="packageFor"
        extraTitle={` ${packageObject?.receiverName}`}
        onBackPressed={() => {
          router.replace(routeOrigin as any);
        }}
      />
      <Text>{packageObject?.receiverName}</Text>
      <Text>{packageObject?.id}</Text>
    </View>
  );
};

const enhance = withObservables(["id"], ({ id }) => ({
  packageObject: findAndObservePackage(id),
}));

const PackageDetails = enhance(PackageDetailsComponent);
export default PackageDetails;
