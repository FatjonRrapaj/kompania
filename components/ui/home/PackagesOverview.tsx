import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import { Body1, Body2, Body1Bold } from "../../StyledText";
import en from "@/translations/en";
import { primary, secondary, tertiary } from "@/constants/Colors";
import PackageNumber from "./PackageNumber";

interface PackagesOverViewProps {
  totalPackages: number;
  processingPackages: number;
  problematicPackages: number;
  onPackageTypePress: (packageStatus: PackageStatus) => void;
}

const PackagesOverView = (props: PackagesOverViewProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  return (
    <View style={styles.container}>
      <Body1Bold style={styles.title}>{translate("allPackages")}</Body1Bold>
      <View style={styles.numbersContainer}>
        <PackageNumber
          status="completed"
          number={props.totalPackages}
          onPress={props.onPackageTypePress}
        />
        <PackageNumber
          status="pending"
          number={props.processingPackages}
          onPress={props.onPackageTypePress}
        />
        <PackageNumber
          status="problematic"
          number={props.problematicPackages}
          onPress={props.onPackageTypePress}
        />
      </View>
    </View>
  );
};

export default PackagesOverView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  numbersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 12,
  },
});
