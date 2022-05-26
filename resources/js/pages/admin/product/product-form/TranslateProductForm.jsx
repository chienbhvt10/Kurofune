import React, { useState } from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormTranslate from "./SubFormTranslate.jsx";

const TranslateProductForm = ({ formJP, formVI, formTL, formEN, formZH }) => {
  const [activeTab, setActiveTab] = useState(1);
  const onChangeLanguageForm = (number) => {
    setActiveTab(number);
  };
  return (
    <SwitchTabLangForm
      onChangeLanguageForm={onChangeLanguageForm}
      activeTab={activeTab}
    >
      <SubFormTranslate
        lang="JA"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        form={formJP}
      />
      <SubFormTranslate
        lang="VI"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        form={formVI}
      />
      <SubFormTranslate
        lang="ZH"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        form={formZH}
      />
      <SubFormTranslate
        lang="TL"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        form={formTL}
      />
      <SubFormTranslate
        lang="EN"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        form={formEN}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateProductForm;
