import iconBack from "../../../../../sass/image/icon-back.png";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './style.scss'
import { TabLink } from "../../../../components/tabs";
import { useTranslation } from "react-i18next";
export const UserLayout = () => {
  const {i18n,t}=useTranslation()
  return (
    <div className="user-layout container-fluid">
      <div className="user-layout-container">
        <div className="user-layout-back">
          <Link to={"."} className="d-flex">
            <img className="icon-back" src={iconBack} alt="" />
            <span className="ml-2">{t('member.user_profile.text_back')}</span>
          </Link>
        </div>
        <TabLink
          infoTabs={[
            { title: `${t('member.user_profile.tab_user_info')}`, routerLink: "/member/change-profile" },
            { title: `${t('member.user_profile.tab_password')}`, routerLink: "/member/change-password" },
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
