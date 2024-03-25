import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTranslation } from "react-i18next";

import IconConfig from "@/assets/svg/IconConfig";
import Pressable from "@/components/Pressable";
import { primary, secondary, tertiary } from "@/constants/Colors";
import { Body2, H6Bold } from "@/components/StyledText";
import en from "@/translations/en";

interface PackageNumberProps {
  number: number;
  status: PackageStatus;
  onPress: (status: PackageStatus) => void;
}

const PackageNumber = (props: PackageNumberProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.home) => t(`home:${key}`);

  type StatusColorMap = {
    [key in PackageStatus]: string;
  };

  type StatusTitleMap = {
    [key in PackageStatus]: string;
  };

  type StatusIconMap = {
    [key in PackageStatus]: FC<SvgProps>;
  };

  const normalColorMapper: StatusColorMap = {
    completed: primary[500],
    pending: secondary[500],
    problematic: tertiary[500],
  };

  const transparentColorMapper: StatusColorMap = {
    completed: primary[10],
    pending: secondary[10],
    problematic: tertiary[10],
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
        },
      ]}
    >
      <View style={styles.numberContainer}>
        <PackageIcon />
        <H6Bold style={{ color: normalColorMapper[props.status] }}>
          {props.number}
        </H6Bold>
      </View>
      <Body2>{titleMapper[props.status]}</Body2>
    </Pressable>
  );
};

export default PackageNumber;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
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
