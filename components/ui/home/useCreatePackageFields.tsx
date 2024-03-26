import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import TextInput, { TextInputType } from "@/components/Form/TextInput";
import { useRef } from "react";
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
      elementKey: "password",
      keyboardType: "default",
      placeholder: translate("enterPassword"),
      secureTextEntry: true,
      containerStyle: { marginBottom: 16 },
      leftIcon: "Lock",
      validate: validateField({
        fieldName: translate("password"),
        required: true,
        min: 6,
        max: 16,
      }),
    },
  ];
}

export default useLoginFields;
