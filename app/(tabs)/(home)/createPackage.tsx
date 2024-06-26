import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { View, ScrollView } from "@/components/Themed";
import globalStyles from "@/components/globalStyles";
import PageHeader from "@/components/PageHeader";
import { GiantButton } from "@/components/StyledButton";
import useCreatePackageFields from "@/components/ui/createPackage/useCreatePackageFields";
import en from "@/translations/en";
import { Body1Bold } from "@/components/StyledText";
import TextInput from "@/components/Form/TextInput";
import PackageSizeSelector from "@/components/ui/createPackage/PackageSizeSelector";
import Checkboxes from "@/components/ui/createPackage/Checkboxes";
import CurrencySelector from "@/components/ui/createPackage/CurrencySelector";
import { PackageFormData, CurrencyShortValue } from "@/api/package";
import usePackageStore from "@/store/package";
import SuccessfullyCreatedPackageModal from "@/components/ui/createPackage/SuccessfullyCreatedPackageModal";
import PlacesAutoComplete from "@/components/PlacesAutocomplete";

const CreatePackage = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);

  const loadingCreatePackage = usePackageStore(
    (state) => state.loadingCreatePackage
  );

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid },
  } = useForm<PackageFormData>({
    // defaultValues: {
    //   receiverName: "Fatjon Rrapaj",
    //   phoneNumber: "0685919978",
    //   profileLink: "http://www.google.com",
    //   address: {
    //     description: "Rruga Don Bosko, kullat hawaiii",
    //     coordinates: {
    //       latitude: 0,
    //       longitude: 0,
    //     },
    //   },
    //   notesForReceiver: "E do shpejte",
    //   packageId: "8123129312",
    //   packageName: "Pako e kuqe",
    //   packageWeight: "2",
    //   packageWidth: "3",
    //   packageLength: "4",
    //   packageHeight: "5",
    //   paymentAmount: "2000",
    //   shippingCost: "300",
    //   cashOnDelivery: "2300",
    //   notesForPackage: "Kujdes se thyhett",
    // },
  });

  const [isStandardPackage, setIsStandardPackage] = useState<boolean>(true);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyShortValue>("ALL");
  const [isFragile, setIsFragile] = useState<boolean>(false);
  const [canBeOpened, setCanBeOpened] = useState<boolean>(true);

  const createPackageFields = useCreatePackageFields({
    isStandardPackage,
    resetField,
    setValue,
  });

  const onSubmit = (data: PackageFormData) => {
    if (isValid) {
      const createPackageData = { ...data };
      createPackageData.isFragile = isFragile;
      createPackageData.canBeOpened = canBeOpened;
      createPackageData.currency = selectedCurrency;
      if (isStandardPackage) {
        createPackageData.packageWeight = undefined;
        createPackageData.packageHeight = undefined;
        createPackageData.packageLength = undefined;
        createPackageData.packageWidth = undefined;
      }
      usePackageStore.getState().createPackage(createPackageData);
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
          keyboardShouldPersistTaps="handled"
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

              case "placesAutoComplete":
                return (
                  <PlacesAutoComplete
                    control={control}
                    key={index}
                    {...(field as any)}
                  />
                );
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
            loading={loadingCreatePackage}
            inactive={!isValid}
            title={translate("publishNow")}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
        <SuccessfullyCreatedPackageModal />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatePackage;
