import React from "react";
import { useTranslation } from "react-i18next";
import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
} from "../../../../../constants";
import "./switch-tab-user-form.scss";
const SwitchTabUserForm = ({ activeTab, onChangeForm, children, role }) => {
  const { t } = useTranslation();

  return (
    <>
      <div id="switch-user-form">
        <div className="tab-label">
          <label
            className={`switch-label ${activeTab === 1 ? "active" : ""}`}
            onClick={() => onChangeForm(1)}
          >
            {t("admins.user.switch_tab.address")}
          </label>
          {role === ROLE_VENDOR ||
          role === ROLE_LIGHT_PLAN ||
          role === ROLE_FULL_SUPPORT_PLAN ? (
            <label
              className={`switch-label ${activeTab === 2 ? "active" : ""}`}
              onClick={() => onChangeForm(2)}
            >
              {t("admins.user.switch_tab.role_info")}
            </label>
          ) : (
            <></>
          )}

          <label
            className={`switch-label ${activeTab === 3 ? "active" : ""}`}
            onClick={() => onChangeForm(3)}
          >
            {t("admins.user.switch_tab.billing_address")}
          </label>
          <label
            className={`switch-label ${activeTab === 4 ? "active" : ""}`}
            onClick={() => onChangeForm(4)}
          >
            {t("admins.user.switch_tab.shipping_address")}
          </label>
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabUserForm;
