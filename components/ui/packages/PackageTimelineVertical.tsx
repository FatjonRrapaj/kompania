import { useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import { PackageTimeline } from "@/api/package";
import { gray, primary } from "@/constants/Colors";
import { Body2, Caption } from "@/components/StyledText";
import en from "@/translations/en";

const PackageTimelineDash = () => (
  <View
    style={{
      height: 40,
      width: 0,
      borderLeftWidth: 1,
      borderStyle: "dashed",
      borderColor: primary[500],
    }}
  />
);

interface PackageTimelineCirclesProps {
  isActive: boolean;
  timestamp: number;
  actionDescription: string;
}

const PackageTimelineCircles = ({
  isActive,
  timestamp,
  actionDescription,
}: PackageTimelineCirclesProps) => {
  const backgroundColor = isActive ? primary : gray;
  return (
    <View style={styles.circlesContainer}>
      <View
        style={[styles.outerCircle, { backgroundColor: backgroundColor[5] }]}
      >
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
      <View style={styles.circlesTimeContainer}>
        <Caption style={{ color: gray[500] }}>Time {timestamp}</Caption>
        <Body2 style={{ position: "absolute" }}>{actionDescription}</Body2>
      </View>
    </View>
  );
};

interface PackageTimelineVerticalProps {
  timeline: PackageTimeline;
}

type TimelinePoint = { timestamp: number; action: string; actionKey: string };

const PackageTimelineVertical = ({
  timeline,
}: PackageTimelineVerticalProps) => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  const [shortVersion, setShortVersion] = useState(false);
  const timelineArray: TimelinePoint[] = useMemo(() => {
    let timelineArr = Object.keys(timeline)
      .filter((k) => !!timeline[k])
      .sort((t1) => ((timeline[t2] as number) - timeline[t1]) as number)
      .map((k) => ({
        timestamp: timeline[k],
        action: translate(k as keyof typeof en.package),
        actionKey: k,
      }));
    if (shortVersion) {
      return timelineArr.slice(0, 2);
    } else return timelineArr;
  }, [shortVersion]);

  return (
    <View>
      <Body2>{timeline.createdAtDate}</Body2>
      {timelineArray.map(({ timestamp, action, actionKey }, index) => (
        <>
          <PackageTimelineCircles
            isActive={
              (index === timelineArray.length - 1 &&
                actionKey !== "deliveredAtDate") ||
              actionKey !== "returnedAtDate"
            }
            timestamp={timestamp}
            actionDescription={action}
          />
          <PackageTimelineDash />
        </>
      ))}
    </View>
  );
};

export default PackageTimelineVertical;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  circlesContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
  circlesTimeContainer: {
    position: "relative",
    alignItems: "flex-start",
  },
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
