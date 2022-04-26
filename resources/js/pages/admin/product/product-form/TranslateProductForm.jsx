import React, { useState } from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormProductTranslate from "./SubFormTranslate";

const TranslateProductForm = ({
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
      <SubFormProductTranslate
        lang="JA"
        className={`tab ${activeTab === 1 ? "active" : ""}`}
        formik={formikJP}
      />
      <SubFormProductTranslate
        lang="VI"
        className={`tab ${activeTab === 2 ? "active" : ""}`}
        formik={formikVI}
      />
      <SubFormProductTranslate
        lang="ZH"
        className={`tab ${activeTab === 3 ? "active" : ""}`}
        formik={formikZH}
      />
      <SubFormProductTranslate
        lang="TL"
        className={`tab ${activeTab === 4 ? "active" : ""}`}
        formik={formikTL}
      />
      <SubFormProductTranslate
        lang="EN"
        className={`tab ${activeTab === 5 ? "active" : ""}`}
        formik={formikEN}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateProductForm;
