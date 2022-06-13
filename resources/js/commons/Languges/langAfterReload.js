import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getCurrentLanguage,
  setCurrentLanguage,
} from "../../helper/localStorage";
export const LangAfterReload = () => {
  const { t, i18n } = useTranslation();
  const langUrl = window.location.pathname.slice(0, 4);
  if (
    langUrl === "/vi/" ||
    langUrl === "/tl/" ||
    langUrl === "/en/" ||
    langUrl === "/zh/"
  ) {
    setCurrentLanguage(window.location.pathname.slice(0, 3));
    var lang = getCurrentLanguage();
  } else {
    var lang = "/ja";
  }
  React.useEffect(() => {
    i18n.changeLanguage(lang?.slice(1));
  }, []);
  return <></>;
};
