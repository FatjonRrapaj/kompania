import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { PackageTimelineStatus } from "@/api/package";
import { gray, primary } from "@/constants/Colors";
import IconConfig from "@/assets/svg/IconConfig";

interface PackageStatusTimelineProps {
  status: PackageTimelineStatus;
}
interface StatusPartProps {
  index: number;
  status: PackageTimelineStatus;
}

type StatusIndexMapper = {
  [key in PackageTimelineStatus]: number;
};

type StatusDotIconMapperType = {
  [key in PackageTimelineStatus]: JSX.Element;
};

const statusIndexMapper: StatusIndexMapper = {
  available: 1,
  accepted: 2,
  picked: 2,
  delivered: 3,
  returned: 1,
};

const statusDotIconMapper: StatusDotIconMapperType = {
  available: <IconConfig.WhiteBox />,
  accepted: <IconConfig.WhiteTruck />,
  picked: <IconConfig.WhiteTruck />,
  delivered: <IconConfig.Package />,
  returned: <IconConfig.Sun />,
};

const StatusDot = ({ index, status }: StatusPartProps) => {
  if (index === 0) {
    return <View style={[styles.dot, { backgroundColor: primary[500] }]} />;
  } else {
    if (statusIndexMapper[status] === index) {
      return (
        <>
          <View style={styles.iconContainer}>
            <View style={styles.iconContainerOverlay} />
            {statusDotIconMapper[status]}
          </View>
        </>
      );
    }
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
            <StatusDot index={index} status={"available"} />
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
  iconContainerOverlay: {
    width: 58,
    height: 58,
    position: "absolute",
    zIndex: 1,
    backgroundColor: primary[20],
    borderRadius: 58 / 2,
  },
  iconContainer: {
    backgroundColor: primary[500],
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    width: 34,
    zIndex: 2,
    borderRadius: 34 / 2,
  },
});
