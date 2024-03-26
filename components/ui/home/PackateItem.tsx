import { StyleSheet, View as RnView } from "react-native";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import { Body1Bold, Body2Bold, Caption } from "@/components/StyledText";
import { View } from "@/components/Themed";
import { dark, gray, white } from "@/constants/Colors";
import { normalColorMapper } from "@/utils/packageUi";
import en from "@/translations/en";
import Pressable from "@/components/Pressable";

interface SmallPackageItemProps extends Package {}

const SmallPackageItem = (props: SmallPackageItemProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  return (
    <Pressable style={styles.container}>
      <RnView style={styles.iconContainer}>
        <IconConfig.Package />
      </RnView>
      <RnView style={styles.infoContainer}>
        <Body1Bold>{props.customer.name}</Body1Bold>
        <Caption>{props.creationDate.toLocaleDateString()}</Caption>
      </RnView>
      <RnView style={styles.priceContainer}>
        <Body2Bold>
          {props.currency.symbol}
          {props.price}
        </Body2Bold>
        <Caption style={{ color: normalColorMapper[props.status] }}>
          {translate(props.status)}
        </Caption>
      </RnView>
    </Pressable>
  );
};

export default SmallPackageItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white[500],
    borderRadius: 16,
    height: 72,
    marginBottom: 16,
    paddingHorizontal: 16,
    marginHorizontal: 3,
    shadowOpacity: 0.2,
    shadowColor: dark[500],
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: gray[10],
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: { gap: 6, flex: 1, marginLeft: 12 },
  priceContainer: { gap: 6, alignItems: "flex-end" },
});
