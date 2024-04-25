import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import {
  Body1,
  Body1Bold,
  Body2Bold,
  Caption,
  H6,
} from "@/components/StyledText";
import { View } from "@/components/Themed";
import { dark, gray, white } from "@/constants/Colors";
import { normalColorMapper } from "@/utils/packageUi";
import en from "@/translations/en";
import Pressable from "@/components/Pressable";

import { Skeleton, Spacer } from "../../Skeleton";
import { Skeleton as DefaultSkeleton } from "moti/skeleton";
import PackageModel from "@/watermelon/models/Package";
import { withObservables } from "@nozbe/watermelondb/react";
import { PackageStatus } from "@/api/package";
import { router } from "expo-router";
import usePackageStore from "@/store/package";
import { getDateFromTimestamp } from "@/utils/date";

interface SmallPackageItemProps {
  packageObject: PackageModel;
}

const SmallPackageItemComponent = ({
  packageObject,
}: SmallPackageItemProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        usePackageStore.getState().setPackageRouteOrigin("/(tabs)/(home)");
        router.push(`/(tabs)/(package)/${packageObject.id}`);
      }}
    >
      <View style={styles.iconContainer}>
        <IconConfig.Package />
      </View>
      <View style={styles.infoContainer}>
        <Body1Bold>{packageObject.receiverName}</Body1Bold>
        <Caption>
          {translate("createdAt") +
            " " +
            getDateFromTimestamp(packageObject.updatedAtDate!)}
        </Caption>
      </View>
      <View style={styles.priceContainer}>
        <Body2Bold>
          {packageObject.currencyShortValue}
          {packageObject.paymentAmount}
        </Body2Bold>
        <Caption
          style={{
            color:
              normalColorMapper[packageObject.packageStatus as PackageStatus],
          }}
        >
          {translate(packageObject.packageStatus as PackageStatus)}
        </Caption>
      </View>
    </Pressable>
  );
};

const enhance = withObservables(["packageObject"], ({ packageObject }) => ({
  packageObject,
}));

const SmallPackageItem = enhance(SmallPackageItemComponent);

const SmallPackageItemLoader = () => {
  return (
    <View style={styles.container}>
      <DefaultSkeleton.Group show>
        <Skeleton
          width={styles.iconContainer.width}
          height={styles.iconContainer.height}
        />
        <View style={styles.infoContainer}>
          <Skeleton>
            <Body1Bold>Fatjon Rr.</Body1Bold>
          </Skeleton>
          <Skeleton>
            <Caption>Created at 22 Aug 13:13</Caption>
          </Skeleton>
        </View>
        <Spacer width={16} />
        <View style={[styles.priceContainer, { alignItems: "flex-start" }]}>
          <Skeleton>
            <Body2Bold>$99</Body2Bold>
          </Skeleton>

          <Skeleton>
            <Caption>Compled</Caption>
          </Skeleton>
        </View>
        <Spacer height={16} />
      </DefaultSkeleton.Group>
    </View>
  );
};

const ItemLoaderList = () =>
  [1, 2, 3, 4].map((_, i) => <SmallPackageItemLoader key={i} />);

const ListEmptyComponent = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  return (
    <View style={styles.emptyViewContainer}>
      <IconConfig.NoPackage />
      <Body1 style={{ color: dark[90] }}>{translate("noPackages")}</Body1>
    </View>
  );
};

export { SmallPackageItem, ItemLoaderList, ListEmptyComponent };

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
  emptyViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
});
