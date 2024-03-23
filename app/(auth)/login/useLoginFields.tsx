import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import TextInput, { TextInputType } from "@/components/Form/TextInput";
import { useRef } from "react";
import en from "@/translations/en";

function useLoginFields(): Array<TextInputType> {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.login) => t(`login:${key}`);
  const passwordRef = useRef(null);

  return [
    {
      nextRef: passwordRef,
      elementKey: "email",
      keyboardType: "email-address",
      placeholder: translate("enterEmail"),
      containerStyle: { marginBottom: 16 },
      leftIcon: "sms",
      validate: validateField({
        fieldName: translate("email"),
        patternType: "email",
        required: true,
      }),
    },
    {
      ref: passwordRef,
      elementKey: "password",
      keyboardType: "default",
      placeholder: translate("enterPassword"),
      secureTextEntry: true,
      containerStyle: { marginBottom: 16 },
      leftIcon: "lock",
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
