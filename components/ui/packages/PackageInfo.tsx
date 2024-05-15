import { useCallback, useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import { Linking, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Clipboard from "@react-native-clipboard/clipboard";

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
import { dark, primary, secondary, tertiary, white } from "@/constants/Colors";
import { GiantButton } from "@/components/StyledButton";
import PackageDetailsModal from "./PackageDetailsModal";
import PackageTimelineVertical from "./PackageTimelineVertical";
import showToast from "@/utils/toast";
import QRCodeModal from "./QrCodeModal";
import DeletePackageConfirmationModal from "./DeletePackageConfirmation";

interface PackageInfoComponentProps {
  id: string;
  packageObject?: PackageModel;
}

const PackageInfoComponent = ({ packageObject }: PackageInfoComponentProps) => {
  const goingBackTimeout = useRef<NodeJS.Timeout>();
  const routeOrigin = usePackageStore((state) => state.packageRouteOrigin);
  const loadingDeletePackage = usePackageStore(
    (state) => state.loadingDeletePackage
  );
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  const [deletePackageModalVisible, setDeletePackageModalVisible] =
    useState(false);
  const [packageDetailsModalVisible, setPackageDetailsModalVisible] =
    useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(goingBackTimeout.current);
    };
  }, []);

  const copyToClipboard = (textToCopy: string) => {
    Clipboard.setString(textToCopy);
    showToast({
      type: "success",
      visibilityTime: 1000,
      text1Key: "copiedPackageId",
    });
  };

  //TODO: try to deeplink the whatsapp message w number & text & not use twilio for these msgs inside.

  if (!packageObject) {
    return null;
  }

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
        <PackageTimelineVertical
          timeline={{
            createdAtDate: packageObject?.createdAtDate,
            postedAtDate: packageObject?.postedAtDate,
            acceptedAtDate: packageObject?.acceptedAtDate,
            pickedAtDate: packageObject?.pickedAtDate,
            deliveredAtDate: packageObject?.deliveredAtDate,
            returnedAtDate: packageObject?.returnedAtDate,
          }}
        />
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
          onPress={() => {
            copyToClipboard(packageObject?.packageScanId!);
          }}
        />
        <GiantButton
          style={{ marginTop: 16 }}
          icon="QRCode"
          type="outline"
          title={translate("showQrCode")}
          onPress={() => {
            setQrCodeModalVisible(true);
          }}
        />
        {packageObject?.courierId && (
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
          onPress={() => {
            Linking.openURL(`tel:${packageObject?.receiverPhoneNumber}`);
          }}
        />
        <GiantButton
          style={{ marginTop: 16 }}
          icon="GreenSMS"
          type="outline"
          title={translate("sendSmsToClient")}
          onPress={() => {
            Linking.openURL(`sms:number?body=TODO://?`);
          }}
        />
        {packageObject?.receiverProfileLink && (
          <GiantButton
            style={{ marginTop: 16 }}
            icon="Insta"
            type="outline"
            title={translate("visitClientProfile")}
            onPress={() => {
              Linking.openURL(packageObject?.receiverProfileLink!);
            }}
          />
        )}
        <GiantButton
          style={{ marginTop: 40, borderColor: dark[500] }}
          icon="Edit"
          type="outline"
          title={translate("edit")}
          onPress={() => {
            usePackageStore.getState().setEditingPackage(packageObject);
            router.push("/(tabs)/(package)/edit");
          }}
        />
        <GiantButton
          loading={loadingDeletePackage}
          style={{ marginTop: 16, borderColor: tertiary[500] }}
          textStyle={{ color: tertiary[500] }}
          icon="Delete"
          type="outline"
          title={translate("delete")}
          onPress={() => {
            setDeletePackageModalVisible(true);
          }}
        />
      </ScrollView>
      {deletePackageModalVisible && (
        <DeletePackageConfirmationModal
          clientName={packageObject?.receiverName!}
          onCancel={() => setDeletePackageModalVisible(false)}
          onConfirm={() => {
            setDeletePackageModalVisible(false);
            usePackageStore.getState().deletePackage(packageObject!, router);
          }}
        />
      )}
      {packageDetailsModalVisible && (
        <PackageDetailsModal
          packageObject={packageObject!}
          onClose={() => setPackageDetailsModalVisible(false)}
        />
      )}
      {qrCodeModalVisible && (
        <QRCodeModal
          code={packageObject?.packageScanId!}
          onClose={() => {
            setQrCodeModalVisible(false);
          }}
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
