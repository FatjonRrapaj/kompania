import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import i18next from "i18next";

import { Body1Bold, Body2, Caption } from "@/components/StyledText";
import { gray, primary, white } from "@/constants/Colors";
import PackageModel from "@/watermelon/models/Package";
import PackageStatusTimeline from "./PackageStatusTimeline";
import { PackageTimelineStatus } from "@/api/package";
import Pressable from "@/components/Pressable";
import usePackageStore from "@/store/package";
import { getDateFromTimestamp } from "@/utils/date";

interface PackageItemLargeProps {
  packageObject: PackageModel;
}

const PackageItemLargeComponent = ({
  packageObject,
}: PackageItemLargeProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        usePackageStore.getState().setPackageRouteOrigin("/(tabs)/packages/");
        router.push(`/(tabs)/(package)/${packageObject.id}`);
      }}
    >
      <View style={[styles.horizontalContainer, { marginBottom: 4 }]}>
        <Body2>{i18next.t("package:client")}</Body2>
        <Body1Bold>{packageObject.receiverName}</Body1Bold>
      </View>
      <PackageStatusTimeline
        status={packageObject.packageTimeLineStatus as PackageTimelineStatus}
      />
      <Caption style={{ marginVertical: 4 }}>
        {getDateFromTimestamp(packageObject.createdAtDate!)}
      </Caption>
      <View style={[styles.horizontalContainer]}>
        <Body1Bold>
          {packageObject.paymentAmount} {packageObject.currencyShortValue}
        </Body1Bold>
        <View style={styles.timelineStatusContainer}>
          <Caption style={{ color: white[500] }}>
            {i18next.t(`package:${packageObject.packageTimeLineStatus}`)}
          </Caption>
        </View>
      </View>
    </Pressable>
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
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: primary[500],
  },
});
