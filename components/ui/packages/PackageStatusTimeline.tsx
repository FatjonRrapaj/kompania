import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { PackageTimelineStatus } from "@/api/package";
import { gray, primary } from "@/constants/Colors";

interface PackageStatusTimelineProps {
  status: PackageTimelineStatus;
}

interface StatusPartProps {
  index: number;
  status: PackageTimelineStatus;
}

type StatusDotMapperType = {
  [key in PackageTimelineStatus]: {
    backgroundColor: string;
    Component?: () => JSX.Element;
  };
};

// const statusDotMapper:StatusDotMapperType  ={

// }

const StatusDot = ({ index, status }: StatusPartProps) => {
  if (index === 0) {
    return <View style={[styles.dot, { backgroundColor: primary[500] }]} />;
  } else {
    return <View style={styles.dot} />;
  }
};

const StatusLine = ({ index }: StatusPartProps) => {
  if (index === 0) {
    return <View style={[styles.line, { backgroundColor: primary[500] }]} />;
  } else {
    return <View style={styles.line} />;
  }
};

const PackageStatusTimeline = ({ status }: PackageStatusTimelineProps) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map((_, index) => {
        return (
          <>
            <StatusDot index={index} status={status} />
            {index >= 0 && index < 3 && (
              <StatusLine index={index} status={status} />
            )}
          </>
        );
      })}
    </View>
  );
};

export default PackageStatusTimeline;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: gray[80],
  },
  line: { flex: 1, height: 2, backgroundColor: gray[80] },
});
