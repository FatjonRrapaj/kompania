import { Body1Bold, Body2 } from "@/components/StyledText";
import { gray } from "@/constants/Colors";
import PackageModel from "@/watermelon/models/Package";
import * as React from "react";
import i18next from "i18next";

import { Text, View, StyleSheet } from "react-native";

interface PackageItemLargeProps {
  packageObject: PackageModel;
}

const PackageItemLarge = ({ packageObject }: PackageItemLargeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Body2>{i18next.t("package:client")}</Body2>
        <Body1Bold>{packageObject.receiverName}</Body1Bold>
      </View>
    </View>
  );
};

export default PackageItemLarge;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: gray[500],
    borderRadius: 16,
    padding: 16,
    alignSelf: "stretch",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
