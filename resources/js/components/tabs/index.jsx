import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage";
import "./style.scss";
export const TabLink = ({ infoTabs }) => {
  const lang = getCurrentLanguage();
  return (
    <>
      <div className="user-layout-tabs">
        <ul className="nav nav-pills">
          {infoTabs.map((infoTab, index) => (
            <li key={index} className="nav-item">
              <NavLink to={`${lang}${infoTab.routerLink}`} className="nav-link">
                <span className="title-tab">{infoTab.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
