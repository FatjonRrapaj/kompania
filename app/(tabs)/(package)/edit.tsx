import { useState } from "react";

import { CreatePackageData, CurrencyShortValue } from "@/api/package";
import usePackageStore from "@/store/package";
import { useForm } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";

const EditPackage = () => {
  const editingPackage: CreatePackageData = usePackageStore((store) => {
    const editingPackageInDb = store.editingPackage;
    const composedPackage: CreatePackageData = {
      receiverName: editingPackageInDb?.receiverName!,
      phoneNumber: editingPackageInDb?.receiverPhoneNumber!,
      profileLink: editingPackageInDb?.receiverProfileUrl!,
      address: editingPackageInDb?.receiverAddressDescription!,
      notesForReceiver: editingPackageInDb?.notesForReceiver!,
      packageId: editingPackageInDb?.id!,
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
  });

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { isValid },
  } = useForm<CreatePackageData>({
    defaultValues: editingPackage,
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

  return (
    <View style={styles.container}>
      <Text>EditPackage</Text>
    </View>
  );
};

export default EditPackage;

const styles = StyleSheet.create({
  container: {},
});
