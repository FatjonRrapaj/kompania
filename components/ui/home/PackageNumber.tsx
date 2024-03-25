import IconConfig from "@/assets/svg/IconConfig";
import { primary, secondary, tertiary } from "@/constants/Colors";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";

interface PackageNumberProps {
  number: number;
  status: PackageStatus;
  onPress: (status: PackageStatus) => void;
}

const PackageNumber = (props: PackageNumberProps) => {
  type StatusColorMap = {
    [key in PackageStatus]: string;
  };
  type StatusIconMap = {
    [key in PackageStatus]: React.FC<SvgProps>;
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

  return <View style={styles.container}></View>;
};

export default PackageNumber;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 90,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 4,
    borderWidth: 1,
  },
  numberContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
