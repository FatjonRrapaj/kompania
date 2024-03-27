import React, { useState, Ref, LegacyRef, forwardRef } from "react";
import {
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps as DefaultTextInputProps,
  ViewStyle,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Controller, Control, ValidationRule } from "react-hook-form";
import { primary, gray, dark, tertiary, white } from "@/constants/Colors";
import { useThemeColor } from "../Themed";
import { Body1, Body2, Caption, Label } from "../StyledText";
import IconConfig from "@/assets/svg/IconConfig";

import Pressable from "../Pressable";
import { FontAwesome } from "@expo/vector-icons";

interface PasswordVisibilityProps {
  isVisible?: boolean;
  onChange: () => void;
}

function PasswordVisibility({
  isVisible,
  onChange,
}: PasswordVisibilityProps): JSX.Element {
  const Icon = isVisible ? IconConfig["Eye"] : IconConfig["EyeSlash"];
  return (
    <Pressable style={styles.iconContainerRight} onPress={onChange}>
      <Icon fill={dark[500]} />
    </Pressable>
  );
}

interface TextInputProps<T = any> extends DefaultTextInputProps {
  control: Control;
  containerStyle?: ViewStyle;
  leftIcon?: keyof typeof IconConfig;
  rightIcon?: keyof typeof IconConfig;
  required?: string | ValidationRule<boolean>;
  ref?: any;
  nextRef?: Ref<unknown>;
  elementKey: string;
  validate: (x: any) => any;
  type: "input";
  onAutoSuggestResultClicked?: (result?: T) => void;
  autoSuggestionApiFunction?: () => Promise<T[]>;
  onClearAutoSuggest: () => void;
}

const clientsMockData = [
  {
    uid: "109312o3123",
    name: "Fatjon Rrapaj",
    phoneNumber: 99999999999,
    profileLink: "fatjon.com",
    address: "Rr Don bosko nrm",
    notesForClient: "eshte me vonese",
    text1: "Fatjon Rrapaj",
    text2: 99999999999,
    text3: "Rr Don bosko nrm",
  },
  {
    uid: "109312seo3123",
    name: "Ledjon Dedolli",
    phoneNumber: 8888888888,
    profileLink: "ledjon.com",
    address: "Rr Kavajes sigurisht",
    notesForClient: "eshte heret",
    text1: "Ledjon Dedolli",
    text2: 8888888888,
    text3: "Rr Kavajes sigurisht",
  },
];

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
      multiline,
      validate,
      onAutoSuggestResultClicked,
      onClearAutoSuggest,
      autoSuggestionApiFunction,
      ...rest
    }: TextInputProps,
    ref
  ): JSX.Element => {
    const textColor = useThemeColor({}, "text");

    const [isFocused, setIsFocused] = useState(false);
    const [inputSecured, setInputSecured] = useState(secureTextEntry);
    const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);
    const [autoSuggestData, setAutoSuggestData] = useState([]);
    const [loadingGetSuggestions, setLoadingGetSuggestions] = useState(false);

    const localOnFocus = () => {
      setIsFocused(true);
    };

    const localOnBlur = () => {
      setIsFocused(false);
    };

    const LeftIcon = leftIcon ? IconConfig[leftIcon] : undefined;
    const RightIcon = rightIcon ? IconConfig[rightIcon] : undefined;

    const hasAutoSuggest = !!onAutoSuggestResultClicked;

    const renderCorrectRightIcon = (value: any) => {
      if (secureTextEntry) {
        return (
          <PasswordVisibility
            onChange={() => {
              setInputSecured((old) => !old);
            }}
            isVisible={!inputSecured}
          />
        );
      }

      if (loadingGetSuggestions) {
        return (
          <View style={styles.iconContainerRight}>
            <ActivityIndicator color={dark[500]} size="small" />
          </View>
        );
      }

      if (hasSelectedSuggestion) {
        return (
          <Pressable
            style={styles.iconContainerRight}
            onPress={() => {
              onClearAutoSuggest();
              setHasSelectedSuggestion(false);
            }}
          >
            <IconConfig.CloseCircle />
          </Pressable>
        );
      }
      if (RightIcon) {
        return (
          <View style={styles.iconContainerRight}>
            <RightIcon fill={isFocused || value ? dark[500] : gray[500]} />
          </View>
        );
      }
    };

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
        }) => {
          return (
            <View style={containerStyle}>
              <View
                style={[
                  styles.inputContainer,
                  (isFocused || value) && styles.inputContainerFocused,
                  LeftIcon && styles.inputWithIcon,
                  multiline && styles.textArea,
                ]}
              >
                {LeftIcon ? (
                  <View style={styles.iconContainer}>
                    <LeftIcon
                      fill={isFocused || value ? dark[500] : gray[500]}
                    />
                  </View>
                ) : null}
                <DefaultTextInput
                  multiline={multiline}
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

                {renderCorrectRightIcon(value)}
              </View>
              {autoSuggestData?.length &&
              hasAutoSuggest &&
              !hasSelectedSuggestion ? (
                <View
                  style={{
                    marginHorizontal: 2,
                    elevation: 3,
                    shadowColor: dark[500],
                    backgroundColor: white[500],
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    borderRadius: 8,
                    marginVertical: 8,
                  }}
                >
                  {autoSuggestData?.length &&
                    autoSuggestData.map((item: any, index) => (
                      <Pressable
                        key={item.uid}
                        style={{
                          padding: 16,
                          position: "relative",
                          gap: 4,
                        }}
                        onPress={() => {
                          onAutoSuggestResultClicked(item);
                          setHasSelectedSuggestion(true);
                          setAutoSuggestData([]);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Body1>{item.text1}</Body1>
                          <Body2>{item.text2}</Body2>
                        </View>
                        <Caption>{item.text3}</Caption>
                        {autoSuggestData?.length - 1 !== index && (
                          <View
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 16,
                              right: 16,
                              height: 1,
                              backgroundColor: gray[80],
                            }}
                          />
                        )}
                      </Pressable>
                    ))}
                </View>
              ) : null}
              {error?.message ? (
                <Label style={styles.label}>{error?.message}</Label>
              ) : null}
            </View>
          );
        }}
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
    paddingLeft: 20,
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
    marginTop: 2,
    alignSelf: "flex-end",
    color: tertiary[500],
  },
  textArea: {
    height: 96,
    paddingTop: 8,
  },
});
