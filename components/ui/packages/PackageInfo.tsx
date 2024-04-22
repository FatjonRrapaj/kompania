import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import usePackageStore from "@/store/package";
import PackageModel from "@/watermelon/models/Package";
import { findAndObservePackage } from "@/watermelon/operations/package/getPackage";
import globalStyles from "@/components/globalStyles";
import { Body1Bold, Body2, Caption } from "@/components/StyledText";
import { View, ScrollView } from "@/components/Themed";
import Pressable from "@/components/Pressable";
import PageHeader from "@/components/PageHeader";
import PackageStatusTimeline from "./PackageStatusTimeline";
import { PackageTimelineStatus } from "@/api/package";
import en from "@/translations/en";
import { primary, white } from "@/constants/Colors";
import { GiantButton } from "@/components/StyledButton";
import PackageDetailsModal from "./PackageDetailsModal";

interface PackageInfoComponentProps {
  id: string;
  packageObject?: PackageModel;
}

const PackageInfoComponent = ({ packageObject }: PackageInfoComponentProps) => {
  const goingBackTimeout = useRef<NodeJS.Timeout>();
  const routeOrigin = usePackageStore((state) => state.packageRouteOrigin);
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  const [packageDetailsModalVisible, setPackageDetailsModalVisible] =
    useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(goingBackTimeout.current);
    };
  }, []);

  //TODO: the package timeline w timestamps conversion & date translation.
  //TODO: try to deepling the whatsapp message w number & text & not use twilio for these msgs inside.

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title="packageFor"
          extraTitle={` ${packageObject?.receiverName}`}
          onBackPressed={() => {
            router.replace(routeOrigin as any);
          }}
        />
        <PackageStatusTimeline
          status={packageObject?.packageTimeLineStatus as PackageTimelineStatus}
        />
        <View
          style={[globalStyles.horizontalContainerSpaced, { marginTop: 32 }]}
        >
          <View style={styles.timelineStatusContainer}>
            <Caption style={styles.timelineStatusText}>
              {translate(
                `${packageObject?.packageTimeLineStatus}Description` as keyof typeof en.package
              )}
            </Caption>
          </View>
          <Pressable onPress={() => setPackageDetailsModalVisible(true)}>
            <Body2 style={styles.checkPackageDetails}>
              {translate("checkPackageDetails")}
            </Body2>
          </Pressable>
        </View>
        <View
          style={[
            globalStyles.horizontalContainerSpaced,
            { marginVertical: 16 },
          ]}
        >
          <Body2> {translate("trackingId")} </Body2>
          <Body1Bold>{packageObject?.packageScanId}</Body1Bold>
        </View>
        <GiantButton
          icon="Copy"
          type="outline"
          title={translate("copyTrackingId")}
          onPress={() => {}}
        />
        <GiantButton
          style={{ marginTop: 16 }}
          icon="QRCode"
          type="outline"
          title={translate("showQrCode")}
          onPress={() => {}}
        />
        {/* TODO: remove the exclamation mark here on !packageObject */}
        {!packageObject?.courierId && (
          <>
            <View
              style={[
                globalStyles.horizontalContainerSpaced,
                { marginVertical: 16 },
              ]}
            >
              <Body2> {translate("courier")} </Body2>
              <Body1Bold>{packageObject?.courierName}</Body1Bold>
            </View>
            <GiantButton
              icon="Call"
              type="outline"
              title={translate("callCourier")}
              onPress={() => {}}
            />
            <GiantButton
              style={{ marginTop: 16 }}
              icon="GreenSMS"
              type="outline"
              title={translate("sendPackageReference")}
              onPress={() => {}}
            />
          </>
        )}
        <View
          style={[
            globalStyles.horizontalContainerSpaced,
            { marginVertical: 16 },
          ]}
        >
          <Body2> {translate("client")} </Body2>
          <Body1Bold>{packageObject?.receiverName}</Body1Bold>
        </View>
        <View
          style={[globalStyles.horizontalContainerSpaced, { marginBottom: 16 }]}
        >
          <Body2> {translate("address")} </Body2>
          <Body1Bold>{packageObject?.receiverAddressDescription}</Body1Bold>
        </View>
        <GiantButton
          icon="Call"
          type="outline"
          title={translate("callClient")}
          onPress={() => {}}
        />
        <GiantButton
          style={{ marginTop: 16 }}
          icon="GreenSMS"
          type="outline"
          title={translate("sendSmsToClient")}
          onPress={() => {}}
        />
        <GiantButton
          style={{ marginTop: 16 }}
          icon="Insta"
          type="outline"
          title={translate("visitClientProfile")}
          onPress={() => {}}
        />
      </ScrollView>
      {packageDetailsModalVisible && (
        <PackageDetailsModal
          packageObject={packageObject!}
          onClose={() => setPackageDetailsModalVisible(false)}
        />
      )}
    </>
  );
};

const enhance = withObservables(["id"], ({ id }) => ({
  packageObject: findAndObservePackage(id),
}));

const PackageDetails = enhance(PackageInfoComponent);
export default PackageDetails;

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  timelineStatusContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: primary[500],
  },
  timelineStatusText: {
    color: white[500],
  },
  checkPackageDetails: {
    color: primary[500],
  },
});
