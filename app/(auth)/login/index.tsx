import * as React from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import { Body1Bold, Body2, H5Bold } from "@/components/StyledText";
import globalStyles from "@/components/globalStyles";
import { gray, primary } from "@/constants/Colors";
import useLoginFields from "./useLoginFields";
import en from "@/translations/en";
import TextInput from "@/components/Form/TextInput";

import SMS from "@/assets/svg/sms.svg";

const Login = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.login) => t(`login:${key}`);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const loginFields = useLoginFields();

  return (
    <View style={globalStyles.screenContainer}>
      <FontAwesome name="truck" size={60} color={primary[500]} />
      <Body1Bold>Kompania</Body1Bold>
      <H5Bold style={styles.title}>{translate("loginTitle")}</H5Bold>
      <Body2 style={styles.description}>{translate("enterInfo")}</Body2>
      {loginFields.map((field, index) => (
        <TextInput
          {...field}
          containerStyle={styles.textInput}
          control={control}
          key={index}
        />
      ))}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
  },
  textInput: { marginBottom: 16 },
  description: {
    color: gray[500],
    marginTop: 2,
    marginBottom: 30,
  },
});
