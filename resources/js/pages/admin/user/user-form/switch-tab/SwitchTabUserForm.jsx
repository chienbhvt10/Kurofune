import React from "react";
import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
} from "../../../../../constants";
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
          {role === ROLE_VENDOR ||
          role === ROLE_LIGHT_PLAN ||
          role === ROLE_FULL_SUPPORT_PLAN ? (
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
