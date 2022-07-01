import React from "react";
import SwitchTabLangForm from "../../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FORM_USER,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../../constants";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../../../../constants/languages";
import SubFormUserTranslate from "./SubFormTranslate";

const TranslateVendorForm = ({
  formJP,
  formVI,
  formTL,
  formEN,
  formZH,
  tabRequiredLang,
}) => {
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);
  const onChangeLanguageForm = (number) => {
    setActiveTab(number);
  };
  React.useEffect(() => {
    if (tabRequiredLang) {
      setActiveTab(tabRequiredLang);
    }
  }, [tabRequiredLang]);

  return (
    <SwitchTabLangForm
      onChangeLanguageForm={onChangeLanguageForm}
      activeTab={activeTab}
      formName={FORM_USER}
    >
      <SubFormUserTranslate
        lang={LANG_ENGLISH}
        className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
        form={formEN}
      />
      <SubFormUserTranslate
        lang={LANG_JAPANESE}
        className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
        form={formJP}
      />
      <SubFormUserTranslate
        lang={LANG_PHILIPPINES}
        className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
        form={formTL}
      />
      <SubFormUserTranslate
        lang={LANG_VIETNAMESE}
        className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
        form={formVI}
      />
      <SubFormUserTranslate
        lang={LANG_CHINESE}
        className={`tab ${activeTab === FIFTH_TAB ? "active" : ""}`}
        form={formZH}
      />
    </SwitchTabLangForm>
  );
};

export default TranslateVendorForm;
