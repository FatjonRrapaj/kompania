import React, { useState, Ref, LegacyRef, forwardRef } from "react";
import {
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps as DefaultTextInputProps,
  ViewStyle,
  View,
} from "react-native";
import { Controller, Control, ValidationRule } from "react-hook-form";
import { primary, gray, dark } from "@/constants/Colors";
import { useThemeColor } from "../Themed";
import { Label } from "../StyledText";
import IconConfig from "@/assets/svg/IconConfig";

import Pressable from "../Pressable";

interface PasswordVisibilityProps {
  isVisible?: boolean;
  onChange: () => void;
}

function PasswordVisibility({
  isVisible,
  onChange,
}: PasswordVisibilityProps): JSX.Element {
  const Icon = isVisible ? IconConfig["eye"] : IconConfig["eyeSlash"];
  return (
    <Pressable style={styles.iconContainerRight} onPress={onChange}>
      <Icon fill={dark[500]} />
    </Pressable>
  );
}

interface TextInputProps extends DefaultTextInputProps {
  control: Control;
  containerStyle?: ViewStyle;
  leftIcon?: keyof typeof IconConfig;
  rightIcon?: keyof typeof IconConfig;
  required?: string | ValidationRule<boolean>;
  ref?: any;
  nextRef?: Ref<unknown>;
  elementKey: string;
  validate: (x: any) => any;
}

const TextInput = forwardRef(
  (
    {
      control,
      placeholder,
      containerStyle,
      leftIcon,
      rightIcon,
      elementKey,
      nextRef,
      secureTextEntry,
      required,
      validate,
      ...rest
    }: TextInputProps,
    ref
  ): JSX.Element => {
    const textColor = useThemeColor({}, "text");

    const [isFocused, setIsFocused] = useState(false);
    const [inputSecured, setInputSecured] = useState(secureTextEntry);

    const localOnFocus = () => {
      setIsFocused(true);
    };

    const localOnBlur = () => {
      setIsFocused(false);
    };

    const LeftIcon = leftIcon ? IconConfig[leftIcon] : undefined;
    const RightIcon = rightIcon ? IconConfig[rightIcon] : undefined;

    return (
      <Controller
        control={control}
        rules={{
          required,
          ...(!!validate && { validate }),
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View
            style={[
              styles.inputContainer,
              (isFocused || value) && styles.inputContainerFocused,
              LeftIcon && styles.inputWithIcon,
              containerStyle,
            ]}
          >
            {LeftIcon ? (
              <View style={styles.iconContainer}>
                <LeftIcon fill={isFocused || value ? dark[500] : gray[500]} />
              </View>
            ) : null}
            <DefaultTextInput
              ref={ref}
              onSubmitEditing={() => (nextRef as any)?.current?.focus()}
              secureTextEntry={inputSecured}
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

            {RightIcon ? (
              <View style={styles.iconContainerRight}>
                <RightIcon fill={isFocused || value ? dark[500] : gray[500]} />
              </View>
            ) : secureTextEntry !== undefined ? (
              <PasswordVisibility
                onChange={() => {
                  setInputSecured((old) => !old);
                }}
                isVisible={!inputSecured}
              />
            ) : null}
            {error?.message ? <Label>{error?.message}</Label> : null}
          </View>
        )}
        name={elementKey}
        {...rest}
      />
    );
  }
);

export default TextInput;

export type TextInputType = Omit<
  TextInputProps,
  "control" | "errors" | "value" | "onChange"
>;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: gray[500],
    borderWidth: 1,
    width: "100%",
    justifyContent: "flex-start",
    position: "relative",
    alignSelf: "stretch",
    borderRadius: 10,
  },
  input: {
    height: 56,
    alignSelf: "stretch",
  },
  inputContainerFocused: {
    borderColor: primary[500],
  },
  inputWithIcon: {
    paddingLeft: 20 + 20 + 20, //icon spacing + icon width + icon distance
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 0,
  },
  iconContainerRight: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
  },
  label: {
    marginTop: 4,
    alignSelf: "flex-end",
    color: "red",
  },
});
