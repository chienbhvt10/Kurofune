import React from "react";
import "./switch-tab-lang-form.scss";
const SwitchTabLangForm = ({ activeTab, onChangeLanguageForm, children }) => {
  return (
    <>
      <div id="switch-lang-form">
        <div className="tab-label">
          <label
            className={`switch-label ${activeTab === 1 ? "active" : ""}`}
            onClick={() => onChangeLanguageForm(1)}
          >
            Japan
          </label>
          <label
            className={`switch-label ${activeTab === 2 ? "active" : ""}`}
            onClick={() => onChangeLanguageForm(2)}
          >
            Vietnam
          </label>
          <label
            className={`switch-label ${activeTab === 3 ? "active" : ""}`}
            onClick={() => onChangeLanguageForm(3)}
          >
            China
          </label>
          <label
            className={`switch-label ${activeTab === 4 ? "active" : ""}`}
            onClick={() => onChangeLanguageForm(4)}
          >
            Philippines
          </label>
          <label
            className={`switch-label ${activeTab === 5 ? "active" : ""}`}
            onClick={() => onChangeLanguageForm(5)}
          >
            English
          </label>
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabLangForm;
