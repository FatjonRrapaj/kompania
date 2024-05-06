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
                  textInputContainer: isFocused
                    ? textInputContainerFocused
                    : textInputContainer,
                  textInput,
                  poweredContainer,
                  powered,
                  listView,
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

//places autocomplete stylings
const textInputContainer = {
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
};
const textInputContainerFocused = {
  ...textInputContainer,
  borderColor: primary[500],
};
const textInput = {
  height: 56,
  marginTop: 4,
  borderRadius: 10,
  backgroundColor: "transparent",
};
const poweredContainer = { display: "none", height: 0 };
const powered = {
  display: "none",
  height: 0,
};
const listView = {
  backgroundColor: "white",
};

const styles = StyleSheet.create({
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
