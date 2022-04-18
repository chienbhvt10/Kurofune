import iconBack from "../../../../../sass/image/icon-back.png";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
import { TabLink } from "../../../../components/tabs";
export const UserLayout = () => {
  return (
    <div className="user-layout container-fluid">
      <div className="user-layout-container">
        <div className="user-layout-back">
          <Link to={"."} className="d-flex">
            <img className="icon-back" src={iconBack} alt="" />
            <span className="ml-2">総合トップページへ戻る</span>
          </Link>
        </div>
        <TabLink
          infoTabs={[
            { title: "ユーザー情報", routerLink: "/member/change-profile" },
            { title: "パスワード情報", routerLink: "/member/change-password" },
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
