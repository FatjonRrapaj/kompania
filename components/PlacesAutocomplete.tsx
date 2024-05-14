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
            <View style={containerStyle}>
              {value && (
                <Label style={{ position: "absolute", top: -16 }}>
                  {placeholder}
                </Label>
              )}
              <GooglePlacesAutocomplete
                disableScroll={true}
                debounce={600}
                fetchDetails={true}
                styles={{
                  textInputContainer:
                    isFocused || value
                      ? {
                          ...styles.textInputContainer,
                          ...styles.textInputContainerFocused,
                        }
                      : styles.textInputContainer,
                  textInput: styles.textInput,
                  poweredContainer: styles.poweredContainer,
                  powered: styles.powered,
                  listView: styles.listView,
                  separator: styles.separator,
                }}
                placeholder={value?.description || translate("placeholder")}
                query={{
                  key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
                  language: i18n.language,
                  radius: 100,

                  components: "country:al|country:xk",
                }}
                onPress={(
                  data: GooglePlaceData,
                  detail: GooglePlaceDetail | null
                ) => {
                  //TODO: add form vaildation to prevent the decscription being too short
                  //Description being too short means that it can be just a city name or smth
                  //or maybe just let it be
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
                  <View style={styles.icon}>
                    <IconConfig.Search />
                  </View>
                )}
              />
              {error?.message ? (
                <Label style={styles.label}>{error?.message}</Label>
              ) : null}
            </View>
          );
        }}
        {...rest}
      />
    );
  }
);

const styles = StyleSheet.create({
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
  textInputContainerFocused: {
    borderColor: primary[500],
  },
  textInput: {
    height: 56,
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  listView: {
    backgroundColor: "white",
  },
  poweredContainer: { display: "none", height: 0 },
  powered: {
    display: "none",
    height: 0,
  },
  separator: {
    width: "100%",
    height: 0.5,
    backgroundColor: gray[500],
  },
  icon: {
    justifyContent: "center",
  },
  label: {
    marginTop: 2,
    alignSelf: "flex-end",
    color: tertiary[500],
  },
});

export default PlacesAutoComplete;
