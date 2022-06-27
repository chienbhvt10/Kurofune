import React from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FORM_PRODUCT,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../constants";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../../../constants/languages";
import SubFormTranslate from "./SubFormTranslate.jsx";

const TranslateProductForm = (props) => {
  const { formJP, formVI, formTL, formEN, formZH, response } = props;
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);

  const onChangeLanguageForm = (number) => {
    setActiveTab(number);
  };

  return (
    <SwitchTabLangForm
      formName={FORM_PRODUCT}
      onChangeLanguageForm={onChangeLanguageForm}
      activeTab={activeTab}
    >
      <SubFormTranslate
        lang={LANG_ENGLISH}
        className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
        form={formEN}
      />
      <SubFormTranslate
        lang={LANG_JAPANESE}
        className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
        form={formJP}
      />
      <SubFormTranslate
        lang={LANG_PHILIPPINES}
        className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
        form={formTL}
      />
      <SubFormTranslate
        lang={LANG_VIETNAMESE}
        className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
        form={formVI}
      />
      <SubFormTranslate
        lang={LANG_CHINESE}
        className={`tab ${activeTab === FIFTH_TAB ? "active" : ""}`}
        form={formZH}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateProductForm;
