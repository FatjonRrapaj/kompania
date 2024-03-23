import { gray, primary, white } from "@/constants/Colors";
import {
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import { JostText, PoppinsText } from "./StyledText";
import Pressable, { PressableProps } from "./Pressable";
import IconConfig from "@/assets/svg/IconConfig";

export type ButtonSize = "giant" | "large" | "medium" | "small";

export type ButtonArrangement = "iconFirst" | "iconLast";

interface StyledButtonProps extends PressableProps {
  title?: string;
  icon?: keyof typeof IconConfig;
  onPress: () => void;
  arrangement?: ButtonArrangement;
  textStyle?: TextStyle;
  iconContainerStyle?: ViewStyle;
  inactive?: Boolean;
}

export function GiantButton({
  title,
  icon,
  onPress,
  arrangement = "iconFirst",
  textStyle,
  iconContainerStyle,
  disabled,
  inactive,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;

  const Icon = icon ? IconConfig[icon] : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles.giant,
        {
          flexDirection:
            arrangement === "iconFirst" ? "column" : "column-reverse",
        },
        (disabled || inactive) && styles.disabled,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {Icon ? (
        <View style={[iconContainerStyle, styles.iconContainerGiant]}>
          <Icon />
        </View>
      ) : null}

      <PoppinsText
        style={[
          styles.textBase,
          { fontSize: 16 },
          (disabled || inactive) && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </PoppinsText>
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
  iconContainerStyle,
  disabled,
  inactive,
  ...rest
}: StyledButtonProps) {
  const { style } = rest;
  const Icon = icon ? IconConfig[icon] : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles.medium,
        {
          flexDirection:
            arrangement === "iconFirst" ? "column" : "column-reverse",
        },
        (disabled || inactive) && styles.disabled,
        style as StyleProp<ViewStyle>,
      ]}
    >
      {Icon ? (
        <View style={[iconContainerStyle, styles.iconContainerMedium]}>
          <Icon />
        </View>
      ) : null}
      <JostText
        style={[
          styles.textBase,
          { fontSize: 14 },
          (disabled || inactive) && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </JostText>
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
  disabled: { backgroundColor: gray[20] },
  disabledText: { color: gray[500] },
});
