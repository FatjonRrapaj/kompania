import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import { Body1, Body2, Body1Bold } from "../../StyledText";
import en from "@/translations/en";
import { primary, secondary, tertiary } from "@/constants/Colors";
import PackageNumber from "./PackageNumber";
import { PackageStatus } from "@/api/package";
import { Company } from "@/api/company";
import { Skeleton as DefaultSkeleton } from "moti/skeleton";
import { Skeleton } from "@/components/Skeleton";

interface PackagesOverViewProps {
  company?: Company;
  loading: boolean;
  onPackageTypePress: (packageStatus: PackageStatus) => void;
}

const PackagesOverView = (props: PackagesOverViewProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  return (
    <View style={styles.container}>
      <Body1Bold style={styles.title}>{translate("allPackages")}</Body1Bold>
      <View style={styles.numbersContainer}>
        <DefaultSkeleton.Group show={props.loading}>
          <Skeleton>
            <PackageNumber
              status="completed"
              number={props?.company?.totals?.allTotals?.completed}
              onPress={props.onPackageTypePress}
            />
          </Skeleton>

          <Skeleton>
            <PackageNumber
              status="pending"
              number={props?.company?.totals?.allTotals?.pending}
              onPress={props?.onPackageTypePress}
            />
          </Skeleton>

          <Skeleton>
            <PackageNumber
              status="problematic"
              number={props?.company?.totals?.allTotals?.problematic}
              onPress={props?.onPackageTypePress}
            />
          </Skeleton>
        </DefaultSkeleton.Group>
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
