import React from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../constants";
import SubFormCategoryTranslate from "./SubFormTranslate";

const TranslateCategoryForm = ({
  formJP,
  formVI,
  formTL,
  formEN,
  formZH,
  response,
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
      <SubFormCategoryTranslate
        lang="JA"
        className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
        form={formJP}
        response={response}
      />
      <SubFormCategoryTranslate
        lang="VI"
        className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
        form={formVI}
        response={response}
      />
      <SubFormCategoryTranslate
        lang="ZH"
        className={`tab ${activeTab === FIFTH_TAB ? "active" : ""}`}
        form={formZH}
        response={response}
      />
      <SubFormCategoryTranslate
        lang="TL"
        className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
        form={formTL}
        response={response}
      />
      <SubFormCategoryTranslate
        lang="EN"
        className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
        form={formEN}
        response={response}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateCategoryForm;
