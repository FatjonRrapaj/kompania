import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import TextInput, { TextInputType } from "@/components/Form/TextInput";
import { useRef } from "react";

function useSignInFields(): Array<TextInputType> {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.signIn) => t(`signIn:${key}`);
  const passwordRef = useRef(null);

  return [
    {
      nextRef: passwordRef,
      elementKey: "email",
      keyboardType: "email-address",
      placeholder: translate("emailAddress"),
      required: true,
      containerStyle: { marginBottom: 10 },
      validate: validateField({
        fieldName: translate("emailAddress"),
        patternType: "email",
        required: true,
      }),
    },
    {
      ref: passwordRef,
      elementKey: "password",
      keyboardType: "default",
      placeholder: translate("passwordPlaceholder"),
      secureTextEntry: true,
      required: true,
      containerStyle: { marginBottom: 10 },
      validate: validateField({
        fieldName: translate("passwordPlaceholder"),
        required: true,
        min: 6,
        max: 16,
      }),
    },
  ];
}

export default useSignInFields;
