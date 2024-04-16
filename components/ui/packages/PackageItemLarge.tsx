import { Body1Bold, Body2, Caption } from "@/components/StyledText";
import { gray, primary, white } from "@/constants/Colors";
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
  return (
    <View style={styles.container}>
      <View style={[styles.horizontalContainer, { marginBottom: 4 }]}>
        <Body2>{i18next.t("package:client")}</Body2>
        <Body1Bold>{packageObject.receiverName}</Body1Bold>
      </View>
      <PackageStatusTimeline
        status={packageObject.packageTimeLineStatus as PackageTimelineStatus}
      />
      <Caption style={{ marginVertical: 4 }}>
        {packageObject.updatedAtDate}
      </Caption>
      <View style={[styles.horizontalContainer]}>
        <Body1Bold>
          {packageObject.paymentAmount} {packageObject.currencySymbol}
        </Body1Bold>
        <View style={styles.timelineStatusContainer}>
          <Caption style={{ color: white[500] }}>
            {i18next.t(`package:${packageObject.packageTimeLineStatus}`)}
          </Caption>
        </View>
      </View>
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
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timelineStatusContainer: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: primary[500],
  },
});
