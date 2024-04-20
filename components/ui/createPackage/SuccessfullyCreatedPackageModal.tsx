import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import { Body2, PoppinsText } from "@/components/StyledText";
import { dark, primary } from "@/constants/Colors";
import en from "@/translations/en";
import { GiantButton } from "@/components/StyledButton";
import { router } from "expo-router";
import IconConfig from "@/assets/svg/IconConfig";
import usePackageStore from "@/store/package";

const SuccessfullyCreatedPackageModal = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  const newCreatedPackageId = usePackageStore(
    (state) => state.newCreatedPackageId
  );

  return (
    <Modal
      visible={!!newCreatedPackageId}
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <BlurView intensity={35} tint="dark" style={styles.blur}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.close}
            onPress={() => {
              usePackageStore.getState().setNewCreatedPackageId(undefined);
            }}
          >
            <IconConfig.CloseCircle />
          </Pressable>
          <View style={styles.packageIconContainer}>
            <View style={styles.fadedCircle2} />
            <View style={styles.fadedCircle} />
            <IconConfig.WhiteBoxDelivered width={30} height={30} />
          </View>
          <PoppinsText style={styles.title}>
            {translate("packageCreated")}
          </PoppinsText>
          <Body2>{translate("couriersNotified")}</Body2>
          <GiantButton
            title={translate("view")}
            onPress={() => {
              usePackageStore.getState().setNewCreatedPackageId(undefined);
              router.push(`/(tabs)/(home)/${newCreatedPackageId}`);
            }}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default SuccessfullyCreatedPackageModal;

const styles = StyleSheet.create({
  close: { alignSelf: "flex-end" },
  blur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  modalContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 20,
    height: 360,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: dark[500],
  },

  packageIconContainer: {
    backgroundColor: primary[500],
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "relative",
  },
  fadedCircle: {
    position: "absolute",
    height: 100,
    width: 100,
    backgroundColor: primary[20],
    borderRadius: 50,
  },
  fadedCircle2: {
    position: "absolute",
    height: 120,
    width: 120,
    backgroundColor: primary[10],
    borderRadius: 60,
  },
});
