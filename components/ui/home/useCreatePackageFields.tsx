import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import TextInput, { TextInputType } from "@/components/Form/TextInput";
import { useRef, useState } from "react";
import en from "@/translations/en";

type FormElementType =
  | "sectionLabel"
  | "input"
  | "autoSuggestInput"
  | "checkbox"
  | "custom"
  | "textArea";

interface LabelType {
  text: string;
  type: "sectionLabel";
}

function useLoginFields(): Array<TextInputType | LabelType> {
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

  const [isStandardPackage, setIsStandardPackage] = useState<boolean>(true);

  //TODO: do the input suggestion here
  return [
    { text: translate("receiverDetails"), type: "sectionLabel" },
    {
      type: "input",
      nextRef: phoneNumberRef,
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
  ];
}

export default useLoginFields;
