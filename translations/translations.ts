import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import sq from "./sq";

const LANGUAGES = {
  en,
  sq,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: LANGUAGES,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "common",
  fallbackLng: "sq",
});
