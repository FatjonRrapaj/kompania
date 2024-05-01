import { useTranslation } from "react-i18next";

import validateField from "@/utils/form";
import { TextInputType } from "@/components/Form/TextInput";
import { useRef } from "react";
import en from "@/translations/en";

function useChangePasswordFields(): Array<TextInputType> {
  const { t } = useTranslation();
  const translate = (key: keyof typeof en.changePassword) =>
    t(`changePassword:${key}`);
  const newPasswordRef = useRef(null);

  return [
    {
      type: "input",
      nextRef: newPasswordRef,
      elementKey: "oldPassword",
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      autoCapitalize: "none",
      secureTextEntry: true,
      keyboardType: "default",
      placeholder: translate("oldPasswordPlaceholder"),
      containerStyle: { marginTop: 32, marginBottom: 24 },
      leftIcon: "Lock",
      validate: validateField({
        fieldName: translate("oldPassword"),
        required: true,
        min: 6,
        max: 16,
      }),
    },
    {
      type: "input",
      ref: newPasswordRef,
      elementKey: "password",
      autoComplete: "off",
      autoCorrect: false,
      spellCheck: false,
      autoCapitalize: "none",
      keyboardType: "default",
      placeholder: translate("newPasswordPlaceholder"),
      secureTextEntry: true,
      containerStyle: { marginBottom: 32 },
      leftIcon: "Lock",
      validate: validateField({
        fieldName: translate("newPassword"),
        required: true,
        min: 6,
        max: 16,
      }),
    },
  ];
}

export default useChangePasswordFields;
