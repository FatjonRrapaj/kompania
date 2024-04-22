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

interface QRCodeModalProps {
  code: string;
}

const QRCodeModalProps = ({ code }: QRCodeModalProps) => {
  return (
    <Modal
      visible
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <BlurView intensity={35} tint="dark" style={styles.blur}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.close}>
            <IconConfig.CloseCircle />
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
};

export default QRCodeModalProps;

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
});
