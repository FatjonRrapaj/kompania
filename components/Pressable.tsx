import * as React from "react";
import {
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
} from "react-native";

const Pressable = ({ style, ...rest }: any) => {
  return (
    <DefaultPressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }, style]}
      {...rest}
    />
  );
};

export default Pressable;
