import { Body1Bold, Body2, Caption } from "@/components/StyledText";
import { gray } from "@/constants/Colors";
import PackageModel from "@/watermelon/models/Package";
import * as React from "react";
import i18next from "i18next";

import { Text, View, StyleSheet } from "react-native";
import PackageStatusTimeline from "./PackageStatusTimeline";
import { PackageTimelineStatus } from "@/api/package";
import { withObservables } from "@nozbe/watermelondb/react";

interface PackageItemLargeProps {
  packageObject: PackageModel;
}

const PackageItemLargeComponent = ({
  packageObject,
}: PackageItemLargeProps) => {
  console.log("packageObject: ", packageObject);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body2>{i18next.t("package:client")}</Body2>
        <Body1Bold>{packageObject.receiverName}</Body1Bold>
      </View>
      <PackageStatusTimeline
        status={packageObject.packageTimeLineStatus as PackageTimelineStatus}
      />
      <Caption>{packageObject.createdAtDate}</Caption>
    </View>
  );
};

const enhance = withObservables(["packageObject"], ({ packageObject }) => ({
  packageObject,
}));

const PackageItemLarge = enhance(PackageItemLargeComponent);
export default PackageItemLarge;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: gray[500],
    borderRadius: 16,
    padding: 16,
    alignSelf: "stretch",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
