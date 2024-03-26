import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import TextInput, { TextInputType } from "@/components/Form/TextInput";
import { useRef, useState } from "react";
import en from "@/translations/en";

type FormElementTypes =
  | "sectionLabel"
  | "input"
  | "autoSuggestInput"
  | "checkbox"
  | "custom"
  | "textArea"
  | "currencySelector"
  | "undefined";

interface FormElementType {
  type: FormElementTypes;
}

export interface LabelType extends FormElementType {
  text: string;
  type: "sectionLabel";
}

interface CustomFieldComponent extends FormElementType {
  type: "custom";
}

interface PackageFieldsProps {
  isStandardPackage: boolean;
}

interface CurrencySelectorComponent extends FormElementType {
  type: "currencySelector";
}

type CreatePackageFieldsType = Array<
  TextInputType | LabelType | CustomFieldComponent | CurrencySelectorComponent
>;

function useCreatePackageFields({
  isStandardPackage,
}: PackageFieldsProps): CreatePackageFieldsType {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.createPackage) =>
    t(`createPackage:${key}`);
  const phoneNumberRef = useRef(null);
  const profileLinkRef = useRef(null);
  //TODO: add google maps autocomplete here later as an option.
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
      containerStyle: { marginBottom: 16 },
      rightIcon: "ArrowDown",
      validate: validateField({
        fieldName: translate("receiverName"),
        patternType: "email",
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
      containerStyle: { marginBottom: 16 },
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
      containerStyle: { marginBottom: 16 },
      validate: validateField({
        fieldName: translate("profileLink"),
        required: true,
        min: 6,
      }),
    },
    {
      ref: addressRef,
      nextRef: clientNotesRef,
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      type: "input",
      elementKey: "address",
      keyboardType: "default",
      placeholder: translate("addressPlaceholder"),
      containerStyle: { marginBottom: 16 },
      validate: validateField({
        fieldName: translate("address"),
        required: true,
        min: 6,
      }),
    },
    {
      ref: clientNotesRef,
      nextRef: packageIdRef,
      type: "input",
      elementKey: "notesForReceiver",
      keyboardType: "default",
      placeholder: translate("notesForReceiverPlaceholder"),
      containerStyle: { marginBottom: 16 },
      multiline: true,
      numberOfLines: 6,
      validate: validateField({
        fieldName: translate("notesForReceiver"),
        required: true,
        min: 6,
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
      containerStyle: { marginBottom: 16 },
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
      containerStyle: { marginBottom: 16 },
      validate: validateField({
        fieldName: translate("packageName"),
        required: false,
      }),
    },
    {
      type: "custom",
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
          containerStyle: { marginBottom: 16 },
          validate: validateField({
            fieldName: translate("weight"),
            required: true,
            min: 6,
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
          containerStyle: { marginBottom: 16 },
          validate: validateField({
            fieldName: translate("wid"),
            required: true,
            min: 6,
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
          containerStyle: { marginBottom: 16 },
          validate: validateField({
            fieldName: translate("len"),
            required: true,
            min: 6,
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
          containerStyle: { marginBottom: 16 },
          validate: validateField({
            fieldName: translate("hei"),
            required: true,
            min: 6,
          }),
        },
      ]
    );
  }

  fields.push(
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
      containerStyle: { marginBottom: 16 },
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
      containerStyle: { marginBottom: 16 },
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
      containerStyle: { marginBottom: 16 },
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
      multiline: true,
      numberOfLines: 6,
      elementKey: "notesForPackage",
      keyboardType: "default",
      placeholder: translate("notesForPackagePlaceholder"),
      containerStyle: { marginBottom: 16 },
      validate: validateField({
        fieldName: translate("notesForPackage"),
        required: true,
      }),
    }
  );

  return fields as CreatePackageFieldsType;
}

export default useCreatePackageFields;