import React, { useState } from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormCategoryTranslate from "./SubFormTranslate";

const TranslateCategoryForm = ({ formJP, formVI, formTL, formEN, formZH }) => {
  const [activeTab, setActiveTab] = useState(1);
  const onChangeLanguageForm = (number) => {
    setActiveTab(number);
  };
  return (
    <SwitchTabLangForm
      onChangeLanguageForm={onChangeLanguageForm}
      activeTab={activeTab}
    >
      <SubFormCategoryTranslate
        lang="EN"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        form={formEN}
      />
      <SubFormCategoryTranslate
        lang="JA"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        form={formJP}
      />
      <SubFormCategoryTranslate
        lang="TL"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        form={formTL}
      />
      <SubFormCategoryTranslate
        lang="VI"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        form={formVI}
      />
      <SubFormCategoryTranslate
        lang="ZH"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        form={formZH}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateCategoryForm;
