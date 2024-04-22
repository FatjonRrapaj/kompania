import { Modal, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import PackageModel from "@/watermelon/models/Package";
import globalStyles from "@/components/globalStyles";
import IconConfig from "@/assets/svg/IconConfig";
import { H7Bold } from "@/components/StyledText";
import en from "@/translations/en";
import Pressable from "@/components/Pressable";

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

  return (
    <Modal>
      <View style={globalStyles.horizontalContainerSpaced}>
        <View>
          <IconConfig.Package />
        </View>
        <H7Bold>
          {translate("packageFor") + " " + packageObject.receiverName}
        </H7Bold>
        <Pressable onPress={onClose}>
          <IconConfig.CloseCircle />
        </Pressable>
      </View>
    </Modal>
  );
};

export default PackageDetailsModal;

const styles = StyleSheet.create({
  container: {},
});
