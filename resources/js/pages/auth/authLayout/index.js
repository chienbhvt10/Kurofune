import React from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
export const AuthLayout = () => {
  return (
      <div className="auth-layout">
        <div className="layout-left">
          <img
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/bg_login-register.jpg"
            alt=""
          ></img>
        </div>
        <div className="layout-right">
          <Outlet></Outlet>
        </div>
      </div>
  );
};
