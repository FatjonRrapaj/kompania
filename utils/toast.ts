import { Toast } from "react-native-toast-message/lib/src/Toast";
import i18next from "i18next";
import { ToastPosition } from "react-native-toast-message";
import en from "@/translations/en";

export function showFirebaseErrorToast({
  errorKey,
  position = "top",
  autoHide = true,
  visibilityTime = 2000,
}: {
  errorKey: keyof typeof en.firebaseErrors;
  position?: ToastPosition | undefined;
  autoHide?: boolean;
  visibilityTime?: number;
}) {
  //default values, if the current translations do not contain the key
  let text1 = i18next.t("toastMessages:somethingWrongText1");
  let text2 = i18next.t("toastMessages:somethingWrongText2");
  if (en.firebaseErrors[errorKey] !== undefined) {
    text1 = i18next.t(`firebaseErrors:${errorKey}.text1`);
    text2 = i18next.t(`firebaseErrors:${errorKey}.text2`);
  }
  Toast.show({
    type: "error",
    text1,
    text2,
    position,
    autoHide,
    visibilityTime,
  });
}

export default function showToast({
  type = "error",
  text1Key,
  text2Key,
  position = "top",
  autoHide = true,
  text1,
  text2,
  visibilityTime = 2000,
}: {
  type: "error" | "success";
  text1Key?: keyof typeof en.toastMessages;
  text2Key?: keyof typeof en.toastMessages;
  position?: ToastPosition | undefined;
  autoHide?: boolean;
  text1?: string;
  text2?: string;
  visibilityTime?: number;
}) {
  Toast.show({
    type,
    text1: text1 ? text1 : i18next.t(`toastMessages:${text1Key}`),
    text2: text2
      ? text2
      : text2Key
      ? i18next.t(`toastMessages:${text2Key}`)
      : undefined,
    position,
    autoHide,
    visibilityTime,
  });
}

export function hideToast() {
  Toast.hide();
}
