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
  | "currencySelector";

interface FormElementType {
  type: FormElementTypes;
}

interface LabelType extends FormElementType {
  text: string;
  type: "sectionLabel";
}

interface CustomFieldComponent extends FormElementType {
  type: "custom";
}

interface PackageFieldsProps extends FormElementType {
  isStandardPackage: boolean;
}

interface CurrencySelectorComponent extends FormElementType {
  type: "currencySelector";
}

function useCreatePackageFields({
  isStandardPackage,
}: PackageFieldsProps): Array<
  | TextInputType
  | LabelType
  | CustomFieldComponent
  | {}
  | CurrencySelectorComponent
> {
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

  //TODO: do the input suggestion here
  return [
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
      keyboardType: "number-pad",
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
      nextRef: isStandardPackage ? packageNameRef : paymentAmountRef,
      type: "input",
      autoCorrect: false,
      spellCheck: false,
      autoComplete: "off",
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
      type: "custom",
    },
    ...(!isStandardPackage
      ? [
          {
            ref: packageNameRef,
            nextRef: isStandardPackage ? packageNameRef : paymentAmountRef,
            type: "input",
            autoCorrect: false,
            spellCheck: false,
            autoComplete: "off",
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
            nextRef: isStandardPackage ? packageNameRef : paymentAmountRef,
            type: "input",
            autoCorrect: false,
            spellCheck: false,
            autoComplete: "off",
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
            nextRef: isStandardPackage ? packageNameRef : paymentAmountRef,
            type: "input",
            autoCorrect: false,
            spellCheck: false,
            autoComplete: "off",
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
        ]
      : []),
  ];
}

export default useCreatePackageFields;
