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
import useCreatePackageFields, {
  CreatePackageData,
} from "@/components/ui/createPackage/useCreatePackageFields";
import en from "@/translations/en";
import { Body1Bold } from "@/components/StyledText";
import TextInput from "@/components/Form/TextInput";
import { useState } from "react";
import PackageSizeSelector from "@/components/ui/createPackage/PackageSizeSelector";
import Checkboxes from "@/components/ui/createPackage/Checkboxes";
import CurrencySelector from "@/components/ui/createPackage/CurrencySelector";
import { CurrencyShortValue } from "@/api/package";

const CreatePackage = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid },
  } = useForm<CreatePackageData>({
    defaultValues: {
      receiverName: "Fatjon Rrapaj",
      phoneNumber: "0685919978",
      profileLink: "http://www.google.com",
      address: "Rruga Don Bosko, kullat hawaiii",
      notesForReceiver: "E do shpejte",
      packageId: "8123129312",
      packageName: "Pako e kuqe",
      packageWeight: "2",
      packageWidth: "3",
      packageLength: "4",
      packageHeight: "5",
      paymentAmount: "2000",
      shippingCost: "300",
      cashOnDelivery: "2300",
      notesForPackage: "Kujdes se thyhett",
    },
  });

  const [isStandardPackage, setIsStandardPackage] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyShortValue>("ALL");
  const [isFragile, setIsFragile] = useState<boolean>(false);
  const [canBeOpened, setCanBeOpened] = useState<boolean>(true);

  const createPackageFields = useCreatePackageFields({
    isStandardPackage,
    resetField,
    setValue,
  });

  const onSubmit = (data: CreatePackageData) => {
    console.log("data: ", JSON.stringify("data"));
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
            switch (field.type) {
              case "sectionLabel":
                return (
                  <Body1Bold
                    key={index}
                    style={{
                      marginTop: index === 0 ? 0 : 16,
                      marginBottom: 16,
                    }}
                  >
                    {field.text}
                  </Body1Bold>
                );
              case "input":
                return <TextInput {...field} control={control} key={index} />;
              case "checkboxes":
                return (
                  <Checkboxes
                    key={index}
                    onCanBeOpenedChange={(v) => setCanBeOpened(v)}
                    onIsFragileChange={(v) => setIsFragile(v)}
                    isFragile={isFragile}
                    canBeOpened={canBeOpened}
                  />
                );
              case "currencySelector":
                return (
                  <CurrencySelector
                    key={index}
                    onCurrencyChange={(currency) =>
                      setSelectedCurrency(currency)
                    }
                    currency={selectedCurrency}
                  />
                );
              case "sizeChecker":
                return (
                  <PackageSizeSelector
                    key={index}
                    onChange={(v) => setIsStandardPackage(v)}
                    isStandard={isStandardPackage}
                  />
                );
              default:
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
