import * as React from "react";
import { StyleSheet } from "react-native";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import { View } from "@/components/Themed";
import { Body1Bold, Body2, H5Bold } from "@/components/StyledText";
import globalStyles from "@/components/globalStyles";
import { gray, primary } from "@/constants/Colors";
import useLoginFields from "../../../components/ui/login/useLoginFields";
import en from "@/translations/en";
import TextInput from "@/components/Form/TextInput";

import Pressable from "@/components/Pressable";
import { GiantButton } from "@/components/StyledButton";
import useAuthStore from "@/store/auth";
import { UserLoginInfo } from "@/api/auth";

const Login = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.login) => t(`login:${key}`);

  const loadingLogin = useAuthStore((state) => state.loadingLogin);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserLoginInfo>({
    defaultValues: {
      email: "fatjonrrapaj@live.com",
      password: "123456",
    } as UserLoginInfo,
  });

  const loginFields = useLoginFields();

  const onSubmit: SubmitHandler<UserLoginInfo> = (info) => {
    if (isValid) {
      useAuthStore.getState().login(info, router);
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <FontAwesome name="truck" size={60} color={primary[500]} />
      <Body1Bold>Kompania</Body1Bold>
      <H5Bold style={styles.title}>{translate("loginTitle")}</H5Bold>
      <Body2 style={styles.description}>{translate("enterInfo")}</Body2>
      {loginFields.map((field, index) => (
        <TextInput
          {...field}
          control={control as Control<UserLoginInfo, any>}
          key={index}
        />
      ))}
      <Pressable
        style={styles.forgotPassword}
        onPress={() => {
          router.navigate("/forgot_password");
        }}
      >
        <Body2 style={styles.forgotPasswordText}>
          {translate("forgotPassword")}
        </Body2>
      </Pressable>
      <GiantButton
        loading={loadingLogin}
        inactive={!isValid}
        disabled={loadingLogin}
        title={translate("login")}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
  },
  description: {
    color: gray[500],
    marginTop: 2,
    marginBottom: 30,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: primary[500],
  },
});
