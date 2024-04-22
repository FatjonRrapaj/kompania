import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import QRCode from "react-qr-code";

import { View } from "@/components/Themed";
import IconConfig from "@/assets/svg/IconConfig";

interface QRCodeModalProps {
  code: string;
  onClose: () => void;
}

const QRCodeModal = ({ code, onClose }: QRCodeModalProps) => {
  return (
    <Modal
      visible
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <BlurView intensity={35} tint="dark" style={styles.blur}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.close} onPress={onClose}>
            <IconConfig.CloseCircle />
          </Pressable>

          <QRCode value={code} size={256} />
        </View>
      </BlurView>
    </Modal>
  );
};

export default QRCodeModal;

const styles = StyleSheet.create({
  close: { alignSelf: "flex-end", marginBottom: 24 },
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
    paddingBottom: 32,
    borderRadius: 20,
  },
});
