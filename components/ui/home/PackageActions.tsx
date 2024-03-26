import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import en from "@/translations/en";
import IconConfig from "@/assets/svg/IconConfig";
import Pressable from "@/components/Pressable";
import { Body1Bold } from "@/components/StyledText";
import { primary, white } from "@/constants/Colors";
import { router } from "expo-router";

const PackageActions = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  const handleOnNewPackagePress = () => {
    router.push("/(tabs)/(home)/createPackage");
  };

  const handleScanPackagePress = () => {};

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.btnBase, styles.addPackage]}
        onPress={handleOnNewPackagePress}
      >
        <IconConfig.AddPackage />
        <Body1Bold style={{ color: white[500] }}>
          {translate("newPackage")}
        </Body1Bold>
      </Pressable>
      <Pressable
        style={[styles.btnBase, styles.scanPackage]}
        onPress={handleScanPackagePress}
      >
        <IconConfig.Scan />
        <Body1Bold>{translate("scanPackage")}</Body1Bold>
      </Pressable>
    </View>
  );
};

export default PackageActions;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  btnBase: {
    borderRadius: 10,
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    flex: 1,
  },
  addPackage: {
    backgroundColor: primary[500],
  },
  scanPackage: {
    borderWidth: 1,
  },
});
