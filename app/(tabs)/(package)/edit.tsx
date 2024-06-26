import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm } from "react-hook-form";

import { View, ScrollView } from "@/components/Themed";
import { PackageFormData, CurrencyShortValue } from "@/api/package";
import usePackageStore from "@/store/package";
import useCreatePackageFields from "@/components/ui/createPackage/useCreatePackageFields";
import PageHeader from "@/components/PageHeader";
import globalStyles from "@/components/globalStyles";
import { Body1Bold } from "@/components/StyledText";
import TextInput from "@/components/Form/TextInput";
import Checkboxes from "@/components/ui/createPackage/Checkboxes";
import CurrencySelector from "@/components/ui/createPackage/CurrencySelector";
import PackageSizeSelector from "@/components/ui/createPackage/PackageSizeSelector";
import { GiantButton } from "@/components/StyledButton";
import { useTranslation } from "react-i18next";
import en from "@/translations/en";
import { router } from "expo-router";
import { GeoPoint } from "firebase/firestore";

const EditPackage = () => {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.package) => t(`package:${key}`);

  const editingPackage: PackageFormData | undefined = usePackageStore(
    (store) => {
      const editingPackageInDb = store.editingPackage;
      if (!store.editingPackage) {
        return undefined;
      }
      const composedPackage: PackageFormData = {
        uid: editingPackageInDb?.id!,
        receiverName: editingPackageInDb?.receiverName!,
        phoneNumber: editingPackageInDb?.receiverPhoneNumber!,
        profileLink: editingPackageInDb?.receiverProfileLink!,
        address: {
          description: editingPackageInDb?.receiverAddressDescription!,
          coordinates: new GeoPoint(
            editingPackage?.address.coordinates?.latitude!,
            editingPackage?.address.coordinates?.longitude!
          ),
        },
        notesForReceiver: editingPackageInDb?.notesForReceiver!,
        packageId: editingPackageInDb?.packageScanId!,
        packageName: editingPackageInDb?.packageName,
        packageWeight: editingPackageInDb?.packageWeight?.toString(),
        packageWidth: editingPackageInDb?.packageWidth?.toString(),
        packageLength: editingPackageInDb?.packageLength?.toString(),
        packageHeight: editingPackageInDb?.packageHeight?.toString(),
        paymentAmount: editingPackageInDb?.paymentAmount?.toString()!,
        shippingCost: editingPackageInDb?.shippingCost?.toString()!,
        cashOnDelivery: editingPackageInDb?.cashOnDelivery?.toString()!,
        notesForPackage: editingPackageInDb?.notesForPackage,
        canBeOpened: !!editingPackageInDb?.canBeOpened,
        isFragile: !!editingPackageInDb?.isFragile,
        currency: editingPackageInDb?.currencyShortValue as CurrencyShortValue,
      };
      return composedPackage;
    }
  );

  const loadingEditingPackage = usePackageStore(
    (store) => store.loadingEditingPackage
  );

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid },
  } = useForm<PackageFormData>({
    defaultValues: editingPackage,
  });

  const [isStandardPackage, setIsStandardPackage] = useState<boolean>(
    !editingPackage?.packageWidth
  );
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
      const editPackageData = { ...data };
      editPackageData.isFragile = isFragile;
      editPackageData.canBeOpened = canBeOpened;
      editPackageData.currency = selectedCurrency;
      if (isStandardPackage) {
        editPackageData.packageWeight = undefined;
        editPackageData.packageHeight = undefined;
        editPackageData.packageLength = undefined;
        editPackageData.packageWidth = undefined;
      }
      usePackageStore.getState().editPackage(data, router);
    }
  };

  if (!editingPackage) {
    return (
      <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]} />
    );
  }

  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 0 }]}>
      <PageHeader
        title="editingPackageFor"
        extraTitle={` ${editingPackage.receiverName}`}
        onBackPressed={() => {
          usePackageStore.getState().setEditingPackage(undefined);
          router.back();
        }}
      />
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
            loading={loadingEditingPackage}
            inactive={!isValid}
            title={translate("save")}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditPackage;
