import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTranslation } from "react-i18next";

import en from "@/translations/en";
import { primary } from "@/constants/Colors";

interface CheckboxesProps {
  isFragile: boolean;
  onIsFragileChange: (isFragile: boolean) => void;
  canBeOpened: boolean;
  onCanBeOpenedChange: (canBeOpened: boolean) => void;
}

const Checkboxes = (props: CheckboxesProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        fillColor={primary[500]}
        unfillColor="#FFFFFF"
        text={translate("fragile")}
        iconStyle={{ borderRadius: 2 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 2 }}
        textStyle={{
          fontFamily: "Poppins",
          textDecorationLine: "none",
        }}
        isChecked={props.isFragile}
        onPress={(isChecked: boolean) => {
          props.onIsFragileChange(isChecked);
        }}
      />
      <BouncyCheckbox
        size={25}
        fillColor={primary[500]}
        unfillColor="#FFFFFF"
        text={translate("canBeOpened")}
        iconStyle={{ borderRadius: 2 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 2 }}
        textStyle={{
          fontFamily: "Poppins",
          textDecorationLine: "none",
        }}
        isChecked={props.canBeOpened}
        onPress={(isChecked: boolean) => {
          props.onCanBeOpenedChange(isChecked);
        }}
      />
    </View>
  );
};

export default Checkboxes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
