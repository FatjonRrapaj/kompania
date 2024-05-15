import * as React from "react";
import { StyleSheet } from "react-native";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import { gray, primary } from "@/constants/Colors";
import en from "@/translations/en";
import TextInput from "@/components/Form/TextInput";

import { GiantButton } from "@/components/StyledButton";
import useAuthStore from "@/store/auth";
import { ChangePasswordInfo } from "@/api/auth";
import useChangePasswordFields from "@/components/ui/login/useChangePasswordFields";
import PageHeader from "@/components/PageHeader";

const ChangePassword = () => {
  const { t } = useTranslation();
  const passwordChanged = useAuthStore(
    (state) => state.profile?.passwordChanged
  );
  const translate = (key: keyof typeof en.changePassword) =>
    t(`changePassword:${key}`);

  const loadingChangePassword = useAuthStore(
    (state) => state.loadingChangePassword
  );

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordInfo>({});

  const changePasswordFields = useChangePasswordFields();

  const onSubmit: SubmitHandler<ChangePasswordInfo> = (info) => {
    if (isValid) {
      useAuthStore.getState().changePassword(info);
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <PageHeader
        title={!passwordChanged ? "changePasswordCreate" : "changePassword"}
      />

      {changePasswordFields.map((field, index) => (
        <TextInput
          {...field}
          control={control as Control<ChangePasswordInfo, any>}
          key={index}
        />
      ))}

      <GiantButton
        loading={loadingChangePassword}
        inactive={!isValid}
        disabled={loadingChangePassword}
        title={translate("save")}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ChangePassword;

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
