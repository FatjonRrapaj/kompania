import { useState, useMemo } from "react";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { PackageTimeline } from "@/api/package";
import { gray, primary } from "@/constants/Colors";

interface PackageTimelineDotProps {
  isActive: boolean;
}

const PackageTimelineDot = ({ isActive }: PackageTimelineDotProps) => {
  const backgroundColor = isActive ? primary : gray;
  return (
    <View style={[styles.outerCircle, { backgroundColor: backgroundColor[5] }]}>
      <View
        style={[styles.midCircle, { backgroundColor: backgroundColor[10] }]}
      >
        <View
          style={[
            styles.innerCircle,
            { backgroundColor: backgroundColor[500] },
          ]}
        />
      </View>
    </View>
  );
};

interface PackageTimelineVerticalProps {
  timeline: PackageTimeline;
}

const PackageTimelineVertical = (props: PackageTimelineVerticalProps) => {
  return <View></View>;
};

export default PackageTimelineVertical;

const styles = StyleSheet.create({
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  midCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
