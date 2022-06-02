import React from "react";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../constants";
import "./switch-tab-lang-form.scss";

const SwitchTabLangForm = ({ activeTab, onChangeLanguageForm, children }) => {
  return (
    <>
      <div id="switch-lang-form">
        <div className="tab-label">
          <label
            className={`switch-label ${
              activeTab === FIRST_TAB ? "active" : ""
            }`}
            onClick={() => onChangeLanguageForm(FIRST_TAB)}
          >
            English
          </label>
          <label
            className={`switch-label ${
              activeTab === SECOND_TAB ? "active" : ""
            }`}
            onClick={() => onChangeLanguageForm(SECOND_TAB)}
          >
            Japan
          </label>
          <label
            className={`switch-label ${
              activeTab === THIRD_TAB ? "active" : ""
            }`}
            onClick={() => onChangeLanguageForm(THIRD_TAB)}
          >
            Thailand
          </label>
          <label
            className={`switch-label ${
              activeTab === FOURTH_TAB ? "active" : ""
            }`}
            onClick={() => onChangeLanguageForm(FOURTH_TAB)}
          >
            Vietnam
          </label>
          <label
            className={`switch-label ${
              activeTab === FIFTH_TAB ? "active" : ""
            }`}
            onClick={() => onChangeLanguageForm(FIFTH_TAB)}
          >
            China
          </label>
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabLangForm;
