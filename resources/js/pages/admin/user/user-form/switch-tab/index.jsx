import React from "react";
import { useTranslation } from "react-i18next";
import {
  FIRST_TAB,
  FOURTH_TAB,
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../../constants";
import { isRoleMember, isRoleVendor } from "../../../../../helper/checker";
import "./switch-tab-user-form.scss";
const SwitchTabUserForm = ({ activeTab, onChangeForm, children, role }) => {
  const { t } = useTranslation();
  return (
    <>
      <div id="switch-user-form">
        <div className="tab-label">
          <label
            className={`switch-label ${
              activeTab === FIRST_TAB ? "active" : ""
            }`}
            onClick={() => onChangeForm(FIRST_TAB)}
          >
            {t("admins.user.switch_tab.address")}
          </label>
          {isRoleMember(role) ? (
            <label
              className={`switch-label ${
                activeTab === SECOND_TAB ? "active" : ""
              }`}
              onClick={() => onChangeForm(SECOND_TAB)}
            >
              {t("admins.user.switch_tab.role_info")}
            </label>
          ) : (
            <></>
          )}
          {!isRoleVendor(role) && (
            <>
              <label
                className={`switch-label ${
                  activeTab === THIRD_TAB ? "active" : ""
                }`}
                onClick={() => onChangeForm(THIRD_TAB)}
              >
                {t("admins.user.switch_tab.billing_address")}
              </label>
              <label
                className={`switch-label ${
                  activeTab === FOURTH_TAB ? "active" : ""
                }`}
                onClick={() => onChangeForm(FOURTH_TAB)}
              >
                {t("admins.user.switch_tab.shipping_address")}
              </label>
            </>
          )}
        </div>
      </div>
      <div id="tab-form">{children}</div>
    </>
  );
};

export default SwitchTabUserForm;
