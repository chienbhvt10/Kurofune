import React from "react";
import "./switch-tab-user-form.scss";
const SwitchTabUserForm = ({ activeTab, onChangeForm, children, role }) => {
  return (
    <>
      <div id="switch-user-form">
        <div className="tab-label">
          <label
            className={`switch-label ${activeTab === 1 ? "active" : ""}`}
            onClick={() => onChangeForm(1)}
          >
            Address
          </label>
          {role === "vendor" ||
          role === "light plan" ||
          role === "full support plan" ? (
            <label
              className={`switch-label ${activeTab === 2 ? "active" : ""}`}
              onClick={() => onChangeForm(2)}
            >
              Role Info
            </label>
          ) : (
            <></>
          )}

          <label
            className={`switch-label ${activeTab === 3 ? "active" : ""}`}
            onClick={() => onChangeForm(3)}
          >
            Billing address
          </label>
          <label
            className={`switch-label ${activeTab === 4 ? "active" : ""}`}
            onClick={() => onChangeForm(4)}
          >
            Shipping address
          </label>
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabUserForm;
