import iconBack from "../../../../../sass/image/icon-back.png";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./style.scss";
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
        <div className="user-layout-tabs">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink
                to="/member/change-profile"
                className="nav-link"
              >
                <span className="title-tab">ユーザー情報</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/member/change-password"
                className="nav-link"
              >
                <span className="title-tab">パスワード情報</span>
              </NavLink>
            </li>
          </ul>
        </div>
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
