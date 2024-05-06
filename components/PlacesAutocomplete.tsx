import React, { useState, Ref, forwardRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { ReactNode } from "react";
import IconConfig from "@/assets/svg/IconConfig";
import { useTranslation } from "react-i18next";
import en from "@/translations/en.js";
import { gray, primary, tertiary } from "@/constants/Colors";

import {
  Controller,
  Control,
  ValidationRule,
  FieldValues,
} from "react-hook-form";
import { Label } from "./StyledText";
import { GeoPoint } from "firebase/firestore";
import { CustomerAddress } from "@/api/company";

type PlacesAutoCompleteProps<
  T = any,
  FormInfoType extends FieldValues = any
> = {
  control: Control<FormInfoType, any>;
  placeholder?: string;
  ref?: any;
  nextRef?: Ref<unknown>;
  elementKey: string;
  required?: string | ValidationRule<boolean>;
  validate: (x: any) => any;
  type: "placesAutoComplete";
  containerStyle?: StyleProp<ViewStyle>;
  onPress: (data: any, detail: any) => void;
};

const PlacesAutoComplete = forwardRef(
  (
    {
      control,
      containerStyle,
      required,
      elementKey,
      placeholder,
      validate,
      ...rest
    }: PlacesAutoCompleteProps,
    ref
  ): ReactNode => {
    const { t, i18n } = useTranslation();
    const translate = (key: keyof typeof en.placesAutoComplete) =>
      t(`placesAutoComplete:${key}`);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <Controller
        name={elementKey}
        control={control}
        rules={{
          required,
          ...(!!validate && { validate }),
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          console.log("value: ", value);

          return (
            <View style={[styles.container as ViewStyle, containerStyle]}>
              {value && (
                <Label style={{ position: "absolute", top: -16 }}>
                  {placeholder}
                </Label>
              )}
              <GooglePlacesAutocomplete
                disableScroll={true}
                debounce={300}
                keyboardShouldPersistTaps="always"
                fetchDetails={true}
                styles={isFocused ? styles.focused : styles.base}
                placeholder={value?.description || translate("placeholder")}
                query={{
                  key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
                  language: i18n.language,
                  types: "address",
                  radius: 500,
                }}
                onPress={(
                  data: GooglePlaceData,
                  detail: GooglePlaceDetail | null
                ) => {
                  const description = data.description;
                  const coordinates = new GeoPoint(
                    detail?.geometry.location.lat ?? -1,
                    detail?.geometry.location.lng ?? -1
                  );
                  const address: CustomerAddress = {
                    description: description,
                    coordinates: coordinates,
                  };
                  onChange(address);
                }}
                textInputProps={{
                  onFocus: () => setIsFocused(true),
                  onBlur: () => {
                    onBlur?.();
                    setIsFocused(false);
                  },
                  autoCorrect: false,
                }}
                renderLeftButton={() => (
                  <View style={styles.icon as ViewStyle}>
                    <IconConfig.Search />
                  </View>
                )}
              />
              {error?.message ? (
                <Label style={styles.label as ViewStyle}>
                  {error?.message}
                </Label>
              ) : null}
            </View>
          );
        }}
        {...rest}
      />
    );
  }
);

const styles = {
  container: {
    height: 56,
    position: "relative",
  },
  base: {
    alignSelf: "stretch",
    position: "relative",
    textInputContainer: {
      borderColor: gray[500],
      borderWidth: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      alignSelf: "stretch",
      borderRadius: 10,
      paddingLeft: 20,
      height: 56,
      backgroundColor: "white",
    },
    textInput: {
      height: 56,
      marginTop: 4,
      borderRadius: 10,
      backgroundColor: "transparent",
    },
    listView: {},
    poweredContainer: { backgroundColor: "red", display: "none", height: 0 },
    powered: {
      display: "none",
      height: 0,
    },
  },
  focused: {
    alignSelf: "stretch",
    position: "relative",
    textInputContainer: {
      borderColor: primary[500],
      borderWidth: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      alignSelf: "stretch",
      borderRadius: 10,
      paddingLeft: 20,
      height: 56,
      backgroundColor: "white",
    },
    row: {
      zIndex: 999,
    },
    predefinedPlacesDescription: { backgroundColor: "red" },
    poweredContainer: { backgroundColor: "red", display: "none", height: 0 },
    powered: {
      display: "none",
      height: 0,
    },
    textInput: {
      height: 56,
      marginTop: 4,
      borderRadius: 10,
      backgroundColor: "transparent",
    },
    listView: {
      top: 60,
      maxHeight: 150,
      position: "absolute",
      backgroundColor: "red",
      zIndex: 999,
    },
  },
  icon: {
    justifyContent: "center",
  },
  label: {
    marginTop: 2,
    alignSelf: "flex-end",
    color: tertiary[500],
  },
};

export default PlacesAutoComplete;
