import { Fragment, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import { PackageTimeline } from "@/api/package";
import { gray, primary } from "@/constants/Colors";
import { Body2, Caption } from "@/components/StyledText";
import en from "@/translations/en";
import IconConfig from "@/assets/svg/IconConfig";
import { getDateFromTimestamp, getHHMMfromTimestamp } from "@/utils/date";

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
        style={[styles.outerCircle, { backgroundColor: backgroundColor[10] }]}
      >
        <View
          style={[styles.midCircle, { backgroundColor: backgroundColor[20] }]}
        >
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: backgroundColor[80] },
            ]}
          />
        </View>
      </View>
      <View style={styles.circlesTimeContainer}>
        {timestamp ? (
          <Caption style={{ color: gray[500], position: "absolute", left: 8 }}>
            {getHHMMfromTimestamp(timestamp)}
          </Caption>
        ) : null}
        {actionDescription ? (
          <Body2 style={{ position: "absolute", top: 8, left: 8 }}>
            {actionDescription}
          </Body2>
        ) : null}
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

  const timelineArray: TimelinePoint[] = useMemo(() => {
    let timelineArr = Object.keys(timeline)
      .filter((k) => k !== "createdAtDate")
      .filter((k) => !!timeline[k])
      .sort((t1, t2) => ((timeline[t2] as number) - timeline[t1]) as number)
      .map((k) => ({
        timestamp: timeline[k],
        action: translate(k as keyof typeof en.package),
        actionKey: k,
      }));
    if (
      timelineArr?.[timelineArr.length - 1]?.actionKey !== "deliveredAtDate" &&
      timelineArr?.[timelineArr.length - 1]?.actionKey !== "returnedAtDate"
    ) {
      timelineArr.push({ timestamp: 0, action: "", actionKey: "" });
    }
    return timelineArr;
  }, [timeline]);

  return (
    <View style={styles.container}>
      <Body2 style={styles.startDate}>
        {getDateFromTimestamp(timeline.createdAtDate!)}
      </Body2>
      <View style={{ alignSelf: "flex-start" }}>
        <View style={{ alignItems: "center" }}>
          {timelineArray.map(({ timestamp, action, actionKey }, index) => (
            <Fragment key={actionKey}>
              <PackageTimelineCircles
                isActive={!!timestamp}
                timestamp={timestamp}
                actionDescription={action}
              />
              {index !== timelineArray.length - 1 && <IconConfig.DashedLine />}
            </Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PackageTimelineVertical;

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  circlesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circlesTimeContainer: {
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "center",
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
  startDate: {
    marginBottom: 16,
    marginLeft: 4,
  },
});
