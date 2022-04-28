import React, { useState } from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormCategoryTranslate from "./SubFormTranslate";

const TranslateCategoryForm = ({
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
      <SubFormCategoryTranslate
        lang="JA"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        formik={formikJP}
      />
      <SubFormCategoryTranslate
        lang="VI"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        formik={formikVI}
      />
      <SubFormCategoryTranslate
        lang="ZH"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        formik={formikZH}
      />
      <SubFormCategoryTranslate
        lang="TL"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        formik={formikTL}
      />
      <SubFormCategoryTranslate
        lang="EN"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        formik={formikEN}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateCategoryForm;
