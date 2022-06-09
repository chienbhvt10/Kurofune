import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import iconBack from "../../../../../sass/image/icon-back.png";
import { TabLink } from "../../../../components/tabs";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import "./style.scss";
export const UserLayout = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  return (
    <div className="user-layout container-fluid">
      <div className="user-layout-container">
        <div className="user-layout-back">
          <Link to={`${lang}/media`} className="d-flex">
            <img className="icon-back" src={iconBack} alt="" />
            <span className="ml-2">{t("member.user_profile.text_back")}</span>
          </Link>
        </div>
        <TabLink
          infoTabs={[
            {
              title: `${t("member.user_profile.tab_user_info")}`,
              routerLink: "/member/change-profile",
            },
            {
              title: `${t("member.user_profile.tab_password")}`,
              routerLink: "/member/change-password",
            },
          ]}
        />
        <div className="container-content">
          <Outlet></Outlet>
        </div>
        <footer className="footer">
          <div className="container-fluid page-footer-content">
            <div className="copy-right text-center">©KUROFUNE 2022</div>
          </div>
        </footer>
      </div>
    </div>
  );
};
