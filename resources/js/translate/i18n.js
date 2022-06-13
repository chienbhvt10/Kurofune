import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locations/en/common.json";
import vi from "./locations/vi/common.json";
import tl from "./locations/tl/common.json";
import ja from "./locations/ja/common.json";
import zh from "./locations/zh/common.json";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
  tl: {
    translation: tl,
  },
  ja: {
    translation: ja,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ja", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
