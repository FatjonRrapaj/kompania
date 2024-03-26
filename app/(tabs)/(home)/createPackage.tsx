import { useNavigation } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PageHeader from "@/components/PageHeader";
import { GiantButton } from "@/components/StyledButton";
import useCreatePackageFields from "@/components/ui/home/useCreatePackageFields";
import en from "@/translations/en";
import { Body1Bold } from "@/components/StyledText";
import TextInput from "@/components/Form/TextInput";
import { useState } from "react";

interface CreatePackageProps {}

const CreatePackage = (props: CreatePackageProps) => {
  const { goBack } = useNavigation();
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [isStandardPackage, setIsStandardPackage] = useState<boolean>(false);

  const createPackageFields = useCreatePackageFields({ isStandardPackage });

  const onSubmit = (data: any) => {
    if (isValid) {
      console.log("data: ", data);
    }
  };

  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <PageHeader title="newPackage" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {createPackageFields.map((field, index) => {
            if (field.type === "sectionLabel") {
              return (
                <Body1Bold
                  key={index}
                  style={{ marginTop: index === 0 ? 0 : 16, marginBottom: 16 }}
                >
                  {field.text}
                </Body1Bold>
              );
            } else if (field.type === "input") {
              return <TextInput {...field} control={control} key={index} />;
            } else {
              return null;
            }
          })}
          <GiantButton
            inactive={!isValid}
            title={translate("publishNow")}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePackage;

const styles = StyleSheet.create({
  container: {},
});
