import { Modal, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import PackageModel from "@/watermelon/models/Package";
import globalStyles from "@/components/globalStyles";
import IconConfig from "@/assets/svg/IconConfig";
import { Body2, Body2Bold, H7Bold, LabelBold } from "@/components/StyledText";
import en from "@/translations/en";
import Pressable from "@/components/Pressable";
import { gray } from "@/constants/Colors";

interface PackageDetailsModalProps {
  packageObject: PackageModel;
  onClose: () => void;
}

const PackageDetailsModal = ({
  packageObject,
  onClose,
}: PackageDetailsModalProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  const showDimensions =
    packageObject?.packageWidth ||
    packageObject?.packageHeight ||
    packageObject?.packageLength ||
    packageObject?.packageWeight;

  const showNotes =
    packageObject?.notesForPackage || packageObject?.notesForReceiver;

  return (
    <Modal presentationStyle="overFullScreen" animationType="slide">
      <View style={globalStyles.screenContainer}>
        <View
          style={[globalStyles.horizontalContainerSpaced, { marginBottom: 16 }]}
        >
          <View style={styles.titleIconContainer}>
            <IconConfig.Package />
          </View>
          <H7Bold>
            {translate("packageFor") + " " + packageObject.receiverName}
          </H7Bold>
          <Pressable onPress={onClose}>
            <IconConfig.CloseCircle />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 8, gap: 8 }}>
          <View style={styles.sectionTitleContainer}>
            <IconConfig.Tag />
            <Body2Bold>{translate("amount")}</Body2Bold>
          </View>
          <View style={globalStyles.horizontalContainerSpaced}>
            <Body2>{translate("paymentAmount")}</Body2>
            <LabelBold>
              {packageObject.paymentAmount} {packageObject.currencyShortValue}
            </LabelBold>
          </View>
          <View style={globalStyles.horizontalContainerSpaced}>
            <Body2>{translate("shippingCost")}</Body2>
            <LabelBold>
              {packageObject.shippingCost} {packageObject.currencyShortValue}
            </LabelBold>
          </View>
          <View style={globalStyles.horizontalContainerSpaced}>
            <Body2>{translate("cashOnDelivery")}</Body2>
            <LabelBold>
              {packageObject.cashOnDelivery} {packageObject.currencyShortValue}
            </LabelBold>
          </View>
          {showDimensions ? (
            <>
              <View style={styles.sectionTitleContainer}>
                <IconConfig.BoxDimensions />
                <Body2Bold>{translate("dimensions")}</Body2Bold>
              </View>
              {packageObject?.packageWidth && (
                <View style={globalStyles.horizontalContainerSpaced}>
                  <Body2>{translate("width")}</Body2>
                  <LabelBold>{packageObject.packageWidth} CM</LabelBold>
                </View>
              )}
              {packageObject?.packageHeight && (
                <View style={globalStyles.horizontalContainerSpaced}>
                  <Body2>{translate("length")}</Body2>
                  <LabelBold>{packageObject.packageHeight} CM</LabelBold>
                </View>
              )}
              {packageObject?.packageLength && (
                <View style={globalStyles.horizontalContainerSpaced}>
                  <Body2>{translate("height")}</Body2>
                  <LabelBold>{packageObject.packageLength} CM</LabelBold>
                </View>
              )}
              {packageObject.packageWeight && (
                <View style={globalStyles.horizontalContainerSpaced}>
                  <Body2>{translate("weight")}</Body2>
                  <LabelBold>{packageObject.packageWeight} KG</LabelBold>
                </View>
              )}
            </>
          ) : null}
          <View style={styles.sectionTitleContainer}>
            <IconConfig.BoxSpecifics />
            <Body2Bold>{translate("specifics")}</Body2Bold>
          </View>
          <View style={globalStyles.horizontalContainerSpaced}>
            <Body2>{translate("isFragile")}</Body2>
            <LabelBold>
              {packageObject?.isFragile ? translate("yes") : translate("no")}
            </LabelBold>
          </View>
          <View style={globalStyles.horizontalContainerSpaced}>
            <Body2>{translate("canBeOpened")}</Body2>
            <LabelBold>
              {packageObject?.canBeOpened ? translate("yes") : translate("no")}
            </LabelBold>
          </View>
          {showNotes ? (
            <>
              <View style={styles.sectionTitleContainer}>
                <IconConfig.Notes />
                <Body2Bold>{translate("notes")}</Body2Bold>
              </View>
              {packageObject?.notesForReceiver && (
                <View>
                  <Body2>{translate("notesForClient")}</Body2>
                  <LabelBold>{packageObject?.notesForReceiver}</LabelBold>
                </View>
              )}
              {packageObject?.notesForPackage && (
                <View>
                  <Body2>{translate("notesForPackage")}</Body2>
                  <LabelBold>{packageObject?.notesForPackage}</LabelBold>
                </View>
              )}
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default PackageDetailsModal;

const styles = StyleSheet.create({
  titleIconContainer: {
    backgroundColor: gray[10],
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitleContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 16,
  },
});
