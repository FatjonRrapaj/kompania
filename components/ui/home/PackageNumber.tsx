import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import Pressable from "@/components/Pressable";
import { Body2, Caption, H6Bold } from "@/components/StyledText";
import en from "@/translations/en";
import {
  StatusTitleMap,
  normalColorMapper,
  transparentColorMapper,
} from "@/utils/packageUi";
import { PackageStatus } from "@/api/package";

interface PackageNumberProps {
  number: number;
  status: PackageStatus;
  onPress: (status: PackageStatus) => void;
}

const PackageNumber = (props: PackageNumberProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  type StatusIconMap = {
    [key in PackageStatus]: FC<SvgProps>;
  };

  const iconMapper: StatusIconMap = {
    completed: IconConfig.TotalPackages,
    pending: IconConfig.ProcessingPackages,
    problematic: IconConfig.ProblematicPackages,
  };

  const titleMapper: StatusTitleMap = {
    completed: translate("inTotal"),
    pending: translate("inProcess"),
    problematic: translate("problematic"),
  };

  const PackageIcon = iconMapper[props.status];

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: transparentColorMapper[props.status],
          borderColor: normalColorMapper[props.status],
          borderWidth: props.number ? 1 : 0,
        },
      ]}
    >
      <View style={styles.numberContainer}>
        <PackageIcon />
        <H6Bold style={{ color: normalColorMapper[props.status] }}>
          {props.number}
        </H6Bold>
      </View>
      <View>
        <Body2>{titleMapper[props.status]}</Body2>
      </View>
    </Pressable>
  );
};

export default PackageNumber;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 60,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
  },
  numberContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
