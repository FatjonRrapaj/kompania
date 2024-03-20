import { primary, white } from "@/constants/Colors";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
} from "react-native";
import { JostText, PoppinsText } from "./StyledText";

export type ButtonSize = "giant" | "large" | "medium" | "small";

export type ButtonArrangement = "iconFirst" | "iconLast";

const IconMapper = {
  test: () => <View />,
  test2: () => <View />,
};

type ViewProps = View["props"];

interface StyledButtonProps extends ViewProps {
  title?: string;
  icon?: keyof typeof IconMapper;
  onPress: () => void;
  arrangement?: ButtonArrangement;
  textStyle: TextStyle;
  iconContainerStyle: ViewStyle;
}

export function GiantButton({
  title,
  icon,
  onPress,
  arrangement = "iconFirst",
  textStyle,
  iconContainerStyle,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;

  const Icon = icon ? IconMapper[icon] : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.giant,
        {
          flexDirection:
            arrangement === "iconFirst" ? "column" : "column-reverse",
        },
        style,
      ]}
    >
      <View style={[iconContainerStyle, styles.iconContainerGiant]}>
        {Icon ? <Icon /> : null}
      </View>

      <PoppinsText style={[styles.textBase, { fontSize: 16 }, textStyle]}>
        {title}
      </PoppinsText>
    </TouchableOpacity>
  );
}

export function LargeButton(props: StyledButtonProps) {
  return (
    <GiantButton
      {...props}
      style={styles.large}
      iconContainerStyle={styles.iconContainerGiant}
    />
  );
}

export function MediumButton({
  title,
  icon,
  onPress,
  arrangement = "iconFirst",
  textStyle,
  iconContainerStyle,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;
  const Icon = icon ? IconMapper[icon] : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.medium,
        {
          flexDirection:
            arrangement === "iconFirst" ? "column" : "column-reverse",
        },
        style,
      ]}
    >
      <View style={[iconContainerStyle, styles.iconContainerMedium]}>
        {Icon ? <Icon /> : null}
      </View>
      <JostText style={[styles.textBase, { fontSize: 14 }, textStyle]}>
        {title}
      </JostText>
    </TouchableOpacity>
  );
}

export function SmallButton(props: StyledButtonProps) {
  return (
    <MediumButton
      {...props}
      style={styles.small}
      textStyle={{ fontSize: 12 }}
      iconContainerStyle={styles.iconContainerSmall}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: primary[500],
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerBase: { justifyContent: "center", alignItems: "center" },
  iconContainerGiant: { height: 24, width: 24 },
  textBase: {
    color: white[500],
  },
  giant: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  large: {
    padding: 10,
    gap: 10,
  },
  iconContainerMedium: { height: 20, width: 20 },
  iconContainerSmall: { width: 18, height: 18 },
  medium: {
    padding: 10,
    gap: 10,
  },
  small: { paddingHorizontal: 8, paddingVertical: 10, gap: 8 },
});
