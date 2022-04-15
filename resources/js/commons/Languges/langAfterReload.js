import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
export const LangAfterReload = () => {
  const { t, i18n } = useTranslation();
  const langUrl = window.location.pathname.slice(0, 4)
  if(langUrl === '/vi/' || langUrl === '/tl/' || langUrl === '/en/' || langUrl === '/zh/'){
    localStorage.setItem('lang', window.location.pathname.slice(0, 3));
    var lang = localStorage.getItem('lang')
  }else{
    var lang = '/ja';
  }
  useEffect(() => {
    i18n.changeLanguage(lang?.slice(1))
  },[]);
  return (
    <> 
    </>
  );
};