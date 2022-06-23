import React from "react";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FORM_CATEGORY,
  FORM_PRODUCT,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../constants";
import "./switch-tab-lang-form.scss";

const SwitchTabLangForm = ({
  activeTab,
  onChangeLanguageForm,
  children,
  formName,
}) => {
  const getActiveTab = (tab) => (activeTab === tab ? "active" : "");

  const showRequired = () =>
    (formName === FORM_PRODUCT || formName === FORM_CATEGORY) && (
      <span className="required-symbol">*</span>
    );

  return (
    <>
      <div id="switch-lang-form">
        <div className="tab-label">
          <label
            className={`switch-label ${getActiveTab(FIRST_TAB)}`}
            onClick={() => onChangeLanguageForm(FIRST_TAB)}
          >
            English{showRequired()}
          </label>
          <label
            className={`switch-label ${getActiveTab(SECOND_TAB)}`}
            onClick={() => onChangeLanguageForm(SECOND_TAB)}
          >
            Japanese{showRequired()}
          </label>
          <label
            className={`switch-label ${getActiveTab(THIRD_TAB)}`}
            onClick={() => onChangeLanguageForm(THIRD_TAB)}
          >
            Tagalog{showRequired()}
          </label>
          <label
            className={`switch-label ${getActiveTab(FOURTH_TAB)}`}
            onClick={() => onChangeLanguageForm(FOURTH_TAB)}
          >
            Vietnamese{showRequired()}
          </label>
          <label
            className={`switch-label ${getActiveTab(FIFTH_TAB)}`}
            onClick={() => onChangeLanguageForm(FIFTH_TAB)}
          >
            Chinese{showRequired()}
          </label>
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabLangForm;
