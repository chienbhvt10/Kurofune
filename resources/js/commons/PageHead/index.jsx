import React, { useEffect } from 'react';
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
const PageHead = ({ title, content }) => {
  const { i18n } = useTranslation();
  let lang = localStorage.getItem('lang')
  useEffect( () => {
    const getData = async () => {
      i18n.changeLanguage(lang.slice(1))
    }
    getData();
  },[]);
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="og:title" content={content} />
    </Helmet>
  );
};

export default PageHead;
