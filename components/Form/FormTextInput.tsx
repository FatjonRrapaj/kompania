import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import { primary, gray } from "@/constants/Colors";
import { useThemeColor } from "../Themed";
import { Label } from "../StyledText";

//TODO: add the icons

const IconMapper = {
  test: () => <View />,
  test2: () => <View />,
};

interface TextInputWithFocusProps extends TextInputProps {
  name: string;
  control: any;
  placeholder: string;
  containerStyle: ViewStyle;
  leftIcon?: keyof typeof IconMapper;
}

const TextInputWithFocus: React.FC<TextInputWithFocusProps> = ({
  name,
  control,
  placeholder,
  containerStyle,
  leftIcon,
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

  const LeftIcon = leftIcon ? IconMapper[leftIcon] : undefined;

  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            containerStyle,
          ]}
        >
          {LeftIcon ? (
            <View style={styles.iconContainer}>
              <LeftIcon />
            </View>
          ) : null}
          <TextInput
            style={[styles.input, { color: textColor }]}
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
          {error?.message ? <Label>{error?.message}</Label> : null}
        </View>
      )}
      name={name}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: gray[500],
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    alignSelf: "stretch",
  },
  input: {
    height: 56,
    alignSelf: "stretch",
  },
  inputContainerFocused: {
    borderColor: primary[500],
  },
  inputWithIcon: {
    paddingLeft: 20 + 24 + 20, //icon spacing + icon width + icon distance
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
  },
  label: {
    marginTop: 4,
    alignSelf: "flex-end",
    color: "red",
  },
});

export default TextInputWithFocus;
