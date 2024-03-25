import IconConfig from "@/assets/svg/IconConfig";
import { Body1Bold, Body2Bold, Caption } from "@/components/StyledText";
import { View } from "@/components/Themed";
import * as React from "react";
import { Text, StyleSheet, View as RnView } from "react-native";

interface SmallPackageItemProps extends Package {}

const SmallPackageItem = (props: SmallPackageItemProps) => {
  return (
    <View style={styles.container}>
      <RnView style={styles.iconContainer}>
        <IconConfig.Package />
      </RnView>
      <RnView style={styles.infoContainer}>
        <Body1Bold>{props.customer.name}</Body1Bold>
        <Caption>{props.creationDate.toLocaleDateString()}</Caption>
      </RnView>
      <RnView style={styles.infoContainer}>
        <Body2Bold>
          {props.currency.symbol}
          {props.price}
        </Body2Bold>
      </RnView>
    </View>
  );
};

export default SmallPackageItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
  },
  iconContainer: { width: 40, height: 40, borderRadius: 10 },
  infoContainer: { gap: 6 },
  priceContainer: { gap: 6 },
});
