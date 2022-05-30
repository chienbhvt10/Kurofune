import React, { useState } from "react";
import SwitchTabLangForm from "../../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormUserTranslate from "./SubFormTranslate";

const TranslateVendorForm = ({ formJP, formVI, formTL, formEN, formZH }) => {
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
        lang="en"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        form={formEN}
      />
      <SubFormUserTranslate
        lang="ja"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        form={formJP}
      />
      <SubFormUserTranslate
        lang="tl"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        form={formTL}
      />
      <SubFormUserTranslate
        lang="vi"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        form={formVI}
      />
      <SubFormUserTranslate
        lang="zh"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        form={formZH}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateVendorForm;
