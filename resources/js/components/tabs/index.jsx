import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
export const TabLink = ({ infoTabs }) => {

  let lang = localStorage.getItem("lang");
  return (
    <>
      <div className="user-layout-tabs">
        <ul className="nav nav-pills">
          {infoTabs.map((infoTab) => (
            <li className="nav-item">
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
