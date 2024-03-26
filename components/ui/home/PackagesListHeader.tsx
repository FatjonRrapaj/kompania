import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import en from "@/translations/en";
import Pressable from "@/components/Pressable";
import { Body1Bold, Body2 } from "@/components/StyledText";
import { primary } from "@/constants/Colors";

const PackagesListHeader = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  const handleSeeAll = () => {};

  return (
    <View style={styles.packagesListTitle}>
      <Body1Bold>{translate("latest")}</Body1Bold>
      <Pressable onPress={handleSeeAll}>
        <Body2 style={styles.seeAll}>{translate("seeAll")}</Body2>
      </Pressable>
    </View>
  );
};

export default PackagesListHeader;

const styles = StyleSheet.create({
  packagesListTitle: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
  },
  seeAll: {
    color: primary[500],
  },
});
