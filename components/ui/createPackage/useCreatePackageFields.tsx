import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import { TextInputType } from "@/components/Form/TextInput";
import { useEffect, useRef } from "react";
import en from "@/translations/en";
import { UseFormResetField, UseFormSetValue } from "react-hook-form";
import { PackageFormData } from "@/api/package";
import CustomerModel from "@/watermelon/models/Customer";
import { GeoPoint } from "firebase/firestore";
import {
  filterCustomersByName,
  filterCustomersByPhone,
} from "@/watermelon/operations/customer/getCustomer";

type FormElementTypes =
  | "sectionLabel"
  | "input"
  | "autoSuggestInput"
  | "checkbox"
  | "sizeChecker"
  | "textArea"
  | "currencySelector"
  | "checkboxes"
  | "placesAutoComplete"
  | "undefined";

interface FormElementType {
  type: FormElementTypes;
}

export interface LabelType extends FormElementType {
  text: string;
  type: "sectionLabel";
}

interface SizeCheckerComponent extends FormElementType {
  type: "sizeChecker";
}

interface CheckboxesComponent extends FormElementType {
  type: "checkboxes";
}

interface CurrencySelectorComponent extends FormElementType {
  type: "currencySelector";
}

interface PlacesAutoComplete extends FormElementType {
  type: "placesAutoComplete";
}

type CreatePackageFieldsType = Array<
  | TextInputType
  | LabelType
  | SizeCheckerComponent
  | CurrencySelectorComponent
  | CheckboxesComponent
  | PlacesAutoComplete
>;

interface PackageFieldsProps {
  isStandardPackage: boolean;
  resetField: UseFormResetField<PackageFormData>;
  setValue: UseFormSetValue<PackageFormData>;
}

function useCreatePackageFields({
  isStandardPackage,
  resetField,
  setValue,
}: PackageFieldsProps): CreatePackageFieldsType {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);
  const phoneNumberRef = useRef(null);
  const profileLinkRef = useRef(null);
  const addressRef = useRef(null);
  const clientNotesRef = useRef(null);
  const packageIdRef = useRef(null);
  const packageNameRef = useRef(null);
  const paymentAmountRef = useRef(null);
  const packageWeightRef = useRef(null);
  const packageWidthRef = useRef(null);
  const packageLengthRef = useRef(null);
  const packageHeightRef = useRef(null);
  const shippingCostRef = useRef(null);
  const cashOnDeliveryRef = useRef(null);
  const notesForPackageRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    resetField("packageWeight");
    resetField("packageWidth");
    resetField("packageLength");
    resetField("packageHeight");
  }, [isStandardPackage, resetField]);

  const handleInputAutoSuggestClicked = (autoSuggest: any) => {
    const client = autoSuggest as CustomerModel;
    const { name, phoneNumber, profileLink, lat, lng, addressDescription } =
      client;

    setValue("receiverName", name);
    setValue("phoneNumber", phoneNumber.toString());
    if (addressDescription) {
      setValue("address", {
        description: addressDescription,
        coordinates: new GeoPoint(lat!, lng!),
      });
    }
    if (profileLink) {
      setValue("profileLink", profileLink);
    }
  };

  const handleAutoSuggestCleared = () => {
    setValue("receiverName", "");
    setValue("phoneNumber", "");
    setValue("address", {});
    setValue("profileLink", "");
  };

  //TODO: do the input suggestion here
  const fields = [
    { text: translate("receiverDetails"), type: "sectionLabel" },
    {
      type: "input",
      nextRef: phoneNumberRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      elementKey: "receiverName",
      keyboardType: "default",
      placeholder: translate("receiverNamePlaceHolder"),
      containerStyle: { marginVertical: 16 },
      rightIcon: "ArrowDown",
      onAutoSuggestResultClicked: handleInputAutoSuggestClicked,
      onClearAutoSuggest: handleAutoSuggestCleared,
      autoSuggestFn: filterCustomersByName,
      autoSuggestMapper: {
        text1: "name",
        text2: "phoneNumber",
        text3: "addressDescription",
      },
      validate: validateField({
        fieldName: translate("receiverName"),
        required: true,
      }),
    },
    {
      ref: phoneNumberRef,
      nextRef: profileLinkRef,
      autoCorrect: false,
      spellCheck: false,
      autoComplete: "off",
      type: "input",
      elementKey: "phoneNumber",
      keyboardType: "phone-pad",
      placeholder: translate("receiverPhoneNumberPlaceholder"),
      onAutoSuggestResultClicked: handleInputAutoSuggestClicked,
      onClearAutoSuggest: handleAutoSuggestCleared,
      autoSuggestFn: filterCustomersByPhone,
      autoSuggestMapper: {
        text1: "name",
        text2: "phoneNumber",
        text3: "addressDescription",
      },
      containerStyle: { marginVertical: 16 },
      rightIcon: "ArrowDown",
      validate: validateField({
        fieldName: translate("receiverPhone"),
        required: true,
        patternType: "phone",
      }),
    },
    {
      ref: profileLinkRef,
      nextRef: addressRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "profileLink",
      keyboardType: "url",
      placeholder: translate("profileLink"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("profileLink"),
        required: false,
        min: 6,
      }),
    },
    {
      ref: addressRef,
      nextRef: clientNotesRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "placesAutoComplete",
      elementKey: "address",
      keyboardType: "default",
      placeholder: translate("addressPlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("address"),
        required: true,
        min: 6,
      }),
    },
    {
      ref: clientNotesRef,
      nextRef: packageIdRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "notesForReceiver",
      keyboardType: "default",
      placeholder: translate("notesForReceiverPlaceholder"),
      containerStyle: { marginVertical: 16 },
      multiline: true,
      numberOfLines: 6,
      validate: validateField({
        fieldName: translate("notesForReceiver"),
      }),
    },
    { text: translate("packageDetails"), type: "sectionLabel" },
    //TODO: validator(regex) for packageId
    {
      ref: packageIdRef,
      nextRef: packageNameRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "packageId",
      keyboardType: "default",
      placeholder: translate("packageIdScanPlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("packageId"),
        required: true,
        min: 6,
      }),
    },
    {
      ref: packageNameRef,
      nextRef: isStandardPackage ? paymentAmountRef : packageWeightRef,
      type: "input",
      autoCorrect: false,
      spellCheck: false,
      autoComplete: "off",
      elementKey: "packageName",
      keyboardType: "default",
      placeholder: translate("packageNamePlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("packageName"),
        required: false,
      }),
    },
    {
      type: "sizeChecker",
    },
  ];

  if (!isStandardPackage) {
    fields.push(
      ...[
        {
          ref: packageWeightRef,
          nextRef: packageWidthRef,
          type: "input",
          autoCorrect: false,
          spellCheck: false,
          autoComplete: "off",
          elementKey: "packageWeight",
          keyboardType: "number-pad",
          placeholder: translate("weightPlaceholder"),
          containerStyle: { marginVertical: 16 },
          validate: validateField({
            fieldName: translate("weight"),
            required: !isStandardPackage,
          }),
        },
        {
          ref: packageWidthRef,
          nextRef: packageLengthRef,
          type: "input",
          autoCorrect: false,
          spellCheck: false,
          autoComplete: "off",
          elementKey: "packageWidth",
          keyboardType: "number-pad",
          placeholder: translate("widPlaceholder"),
          containerStyle: { marginVertical: 16 },
          validate: validateField({
            fieldName: translate("wid"),
            required: !isStandardPackage,
          }),
        },
        {
          ref: packageLengthRef,
          nextRef: packageHeightRef,
          type: "input",
          autoCorrect: false,
          spellCheck: false,
          autoComplete: "off",
          elementKey: "packageLength",
          keyboardType: "number-pad",
          placeholder: translate("lenPlaceholder"),
          containerStyle: { marginVertical: 16 },
          validate: validateField({
            fieldName: translate("len"),
            required: !isStandardPackage,
          }),
        },
        {
          ref: packageHeightRef,
          nextRef: paymentAmountRef,
          type: "input",
          autoCorrect: false,
          spellCheck: false,
          autoComplete: "off",
          elementKey: "packageHeight",
          keyboardType: "number-pad",
          placeholder: translate("heiPlaceholder"),
          containerStyle: { marginVertical: 16 },
          validate: validateField({
            fieldName: translate("hei"),
            required: !isStandardPackage,
          }),
        },
      ]
    );
  }

  fields.push(
    { type: "checkboxes" },
    { type: "currencySelector" },
    {
      ref: paymentAmountRef,
      nextRef: shippingCostRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "paymentAmount",
      keyboardType: "number-pad",
      placeholder: translate("paymentAmountPlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("paymentAmount"),
        required: true,
      }),
    },
    {
      ref: shippingCostRef,
      nextRef: cashOnDeliveryRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "shippingCost",
      keyboardType: "number-pad",
      placeholder: translate("shippingCostPlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("shippingCost"),
        required: true,
      }),
    },
    {
      ref: cashOnDeliveryRef,
      nextRef: notesForPackageRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "cashOnDelivery",
      keyboardType: "number-pad",
      placeholder: translate("cashOnDeliveryPlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("cashOnDelivery"),
        required: true,
      }),
    },
    {
      ref: notesForPackageRef,
      nextRef: endRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      multiline: true as any,
      numberOfLines: 6 as any,
      elementKey: "notesForPackage",
      keyboardType: "default",
      placeholder: translate("notesForPackagePlaceholder"),
      containerStyle: { marginVertical: 16 },
      validate: validateField({
        fieldName: translate("notesForPackage"),
        required: true,
      }),
    }
  );

  return fields as CreatePackageFieldsType;
}

export default useCreatePackageFields;
