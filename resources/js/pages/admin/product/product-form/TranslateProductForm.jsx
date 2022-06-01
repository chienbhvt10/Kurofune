import React from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../constants";
import SubFormProductTranslate from "./SubFormTranslate";

const TranslateProductForm = ({
  formikJP,
  formikVI,
  formikTL,
  formikEN,
  formikZH,
}) => {
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);

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
        className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
        formik={formikJP}
      />
      <SubFormProductTranslate
        lang="VI"
        className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
        formik={formikVI}
      />
      <SubFormProductTranslate
        lang="ZH"
        className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
        formik={formikZH}
      />
      <SubFormProductTranslate
        lang="TL"
        className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
        formik={formikTL}
      />
      <SubFormProductTranslate
        lang="EN"
        className={`tab ${activeTab === FIFTH_TAB ? "active" : ""}`}
        formik={formikEN}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateProductForm;
