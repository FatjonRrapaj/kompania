import { Caption } from "@/components/StyledText";
import { dark, gray, primary } from "@/constants/Colors";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import en from "@/translations/en";
import IconConfig from "@/assets/svg/IconConfig";
import Pressable from "@/components/Pressable";

interface PackageSizeSelectorProps {
  isStandard: boolean;
  onChange: (isStandard: boolean) => void;
}

const PackageSizeSelector = ({
  isStandard,
  onChange,
}: PackageSizeSelectorProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  const standardColor = isStandard ? primary[500] : gray[500];
  const notStandardColor = !isStandard ? primary[500] : gray[500];

  return (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={() => onChange(true)}>
        <View style={styles.iconContainer}>
          <IconConfig.PackageSize width={30} height={30} fill={standardColor} />
        </View>

        <Caption style={{ color: standardColor }}>
          {translate("standard")}
        </Caption>
      </Pressable>
      <Pressable style={styles.box} onPress={() => onChange(false)}>
        <View style={styles.iconContainer}>
          <IconConfig.PackageSize
            width={50}
            height={50}
            fill={notStandardColor}
          />
        </View>

        <Caption style={{ color: notStandardColor }}>
          {translate("other")}
        </Caption>
      </Pressable>
    </View>
  );
};

export default PackageSizeSelector;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  box: {
    height: 90,
    width: 90,
    borderColor: gray[500],
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingBottom: 8,
  },
  iconContainer: {
    flex: 1,
    marginBottom: 4,
    justifyContent: "flex-end",
  },
});
