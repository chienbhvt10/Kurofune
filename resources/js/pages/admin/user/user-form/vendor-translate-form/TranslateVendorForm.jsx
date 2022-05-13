import React, { useState } from "react";
import SwitchTabLangForm from "../../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormUserTranslate from "./SubFormTranslate";

const TranslateVendorForm = ({
  formikJP,
  formikVI,
  formikTL,
  formikEN,
  formikZH,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const onChangeLanguageForm = (number) => {
    setActiveTab(number);
  };
  return (
    <SwitchTabLangForm
      onChangeLanguageForm={onChangeLanguageForm}
      activeTab={activeTab}
    >
      <SubFormUserTranslate
        lang="JA"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        formik={formikJP}
      />
      <SubFormUserTranslate
        lang="VI"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        formik={formikVI}
      />
      <SubFormUserTranslate
        lang="ZH"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        formik={formikZH}
      />
      <SubFormUserTranslate
        lang="TL"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        formik={formikTL}
      />
      <SubFormUserTranslate
        lang="EN"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        formik={formikEN}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateVendorForm;