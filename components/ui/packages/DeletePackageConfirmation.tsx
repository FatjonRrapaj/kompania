import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import { Body2, PoppinsText } from "@/components/StyledText";
import { dark, primary, tertiary } from "@/constants/Colors";
import en from "@/translations/en";
import { GiantButton } from "@/components/StyledButton";
import { router } from "expo-router";
import IconConfig from "@/assets/svg/IconConfig";
import usePackageStore from "@/store/package";
import globalStyles from "@/components/globalStyles";

interface DeletePackageConfirmationModalProps {
  clientName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePackageConfirmationModal = ({
  clientName,
  onCancel,
  onConfirm,
}: DeletePackageConfirmationModalProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  return (
    <Modal transparent presentationStyle="overFullScreen" animationType="fade">
      <BlurView intensity={35} tint="dark" style={styles.blur}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.close} onPress={onCancel}>
            <IconConfig.CloseCircle />
          </Pressable>
          <View style={styles.packageIconContainer}>
            <View style={styles.fadedCircle2} />
            <View style={styles.fadedCircle} />
            <IconConfig.NoPackageWhite width={30} height={30} />
          </View>

          <Body2>{translate("sureDelete") + clientName}</Body2>
          <View style={[globalStyles.horizontalContainerSpaced, { gap: 32 }]}>
            <GiantButton
              style={{ borderColor: dark[500] }}
              type="outline"
              title={translate("noCancel")}
              onPress={onCancel}
            />
            <GiantButton
              style={{ borderColor: tertiary[500] }}
              textStyle={{ color: tertiary[500] }}
              type="outline"
              title={translate("yesDelete")}
              onPress={onConfirm}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default DeletePackageConfirmationModal;

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
    backgroundColor: tertiary[500],
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
    backgroundColor: tertiary[20],
    borderRadius: 50,
  },
  fadedCircle2: {
    position: "absolute",
    height: 120,
    width: 120,
    backgroundColor: tertiary[10],
    borderRadius: 60,
  },
});
