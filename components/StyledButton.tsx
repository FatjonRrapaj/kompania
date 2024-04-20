import { dark, gray, primary, white } from "@/constants/Colors";
import {
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from "react-native";
import { JostText, PoppinsText } from "./StyledText";
import Pressable, { PressableProps } from "./Pressable";
import IconConfig from "@/assets/svg/IconConfig";

export type ButtonSize = "giant" | "large" | "medium" | "small";
export type ButtonType = "default" | "outline";

export type ButtonArrangement = "iconFirst" | "iconLast";

interface StyledButtonProps extends PressableProps {
  title?: string;
  icon?: keyof typeof IconConfig;
  onPress: () => void;
  arrangement?: ButtonArrangement;
  textStyle?: TextStyle;
  iconContainerStyle?: ViewStyle;
  inactive?: boolean;
  loading?: boolean;
  type?: ButtonType;
}

export function GiantButton({
  title,
  icon,
  onPress,
  arrangement = "iconFirst",
  type = "default",
  textStyle,
  iconContainerStyle,
  disabled,
  inactive,
  loading,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;

  const Icon = icon ? IconConfig[icon] : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        type === "default" ? styles.base : styles.baseOutline,
        styles.giant,
        {
          flexDirection: arrangement === "iconFirst" ? "row" : "row-reverse",
        },
        inactive && styles.inactive,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {Icon ? (
        <View
          style={[
            iconContainerStyle,
            styles.iconContainerGiant,
            loading && styles.loadingIconContainer,
          ]}
        >
          <Icon />
        </View>
      ) : null}

      <PoppinsText
        style={[
          type === "default" ? styles.textBase : styles.textBaseOutline,
          { fontSize: 16 },
          inactive && styles.inactiveText,
          loading && styles.loadingText,
          textStyle,
        ]}
      >
        {title}
      </PoppinsText>
      {loading && (
        <View
          style={[StyleSheet.absoluteFill, styles.activityIndicatorContainer]}
        >
          <ActivityIndicator size={"small"} style={{}} color={white[500]} />
        </View>
      )}
    </Pressable>
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
  type = "default",
  iconContainerStyle,
  disabled,
  inactive,
  loading,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;
  const Icon = icon ? IconConfig[icon] : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        type === "default" ? styles.base : styles.baseOutline,
        styles.medium,
        {
          flexDirection: arrangement === "iconFirst" ? "row" : "row-reverse",
        },
        inactive && styles.inactive,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {Icon ? (
        <View
          style={[
            iconContainerStyle,
            styles.iconContainerMedium,
            loading && styles.loadingIconContainer,
          ]}
        >
          <Icon />
        </View>
      ) : null}
      <JostText
        style={[
          type === "default" ? styles.textBase : styles.textBaseOutline,
          { fontSize: 14 },
          inactive && styles.inactiveText,
          loading && styles.loadingText,
          textStyle,
        ]}
      >
        {title}
      </JostText>
      {loading && (
        <View
          style={[StyleSheet.absoluteFill, styles.activityIndicatorContainer]}
        >
          <ActivityIndicator size={"small"} style={{}} color={white[500]} />
        </View>
      )}
    </Pressable>
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
    position: "relative",
  },
  baseOutline: {
    borderColor: primary[500],
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconContainerBase: { justifyContent: "center", alignItems: "center" },
  iconContainerGiant: { height: 24, width: 24 },
  textBase: {
    color: white[500],
  },
  textBaseOutline: {
    color: dark[500],
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
  inactive: { backgroundColor: gray[20] },
  inactiveText: { color: gray[500] },
  loadingText: { opacity: 0 },
  loadingIconContainer: { opacity: 0 },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
