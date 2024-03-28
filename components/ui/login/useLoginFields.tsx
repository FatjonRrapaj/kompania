import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import { TextInputType } from "@/components/Form/TextInput";
import { useRef } from "react";
import en from "@/translations/en";

function useLoginFields(): Array<TextInputType> {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.login) => t(`login:${key}`);
  const passwordRef = useRef(null);

  return [
    {
      type: "input",
      nextRef: passwordRef,
      elementKey: "email",
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      autoCapitalize: "none",
      keyboardType: "email-address",
      placeholder: translate("enterEmail"),
      containerStyle: { marginBottom: 16 },
      leftIcon: "SMS",
      validate: validateField({
        fieldName: translate("email"),
        patternType: "email",
        required: true,
      }),
    },
    {
      type: "input",
      ref: passwordRef,
      elementKey: "password",
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      autoCapitalize: "none",
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
