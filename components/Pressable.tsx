import * as React from "react";
import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface PressableProps extends DefaultPressableProps {}

const Pressable = ({ style, ...rest }: PressableProps) => {
  return (
    <DefaultPressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1.0 },
        style as StyleProp<ViewStyle>,
      ]}
      {...rest}
    />
  );
};

export default Pressable;
