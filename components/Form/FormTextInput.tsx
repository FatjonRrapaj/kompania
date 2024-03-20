import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { Controller } from "react-hook-form";
import { primary, gray } from "@/constants/Colors";
import { useThemeColor } from "../Themed";

interface TextInputWithFocusProps extends TextInputProps {
  name: string;
  control: any;
  placeholder: string;
  containerStyle: ViewStyle;
}

const TextInputWithFocus: React.FC<TextInputWithFocusProps> = ({
  name,
  control,
  placeholder,
  containerStyle,
  ...rest
}) => {
  const textColor = useThemeColor({}, "text");

  const [isFocused, setIsFocused] = useState(false);

  const localOnFocus = () => {
    setIsFocused(true);
  };

  const localOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[
            styles.inputBase,
            isFocused && styles.inputFocused,
            { color: textColor },
            containerStyle,
          ]}
          onFocus={() => {
            localOnFocus();
          }}
          onBlur={() => {
            onBlur();
            localOnBlur();
          }}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
      )}
      name={name}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputBase: {
    height: 56,
    borderColor: gray[500],
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputFocused: {
    borderColor: primary[500],
  },
});

export default TextInputWithFocus;
