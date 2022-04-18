import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
export const TabLink = ({ infoTabs }) => {
  return (
    <>
      <div className="user-layout-tabs">
        <ul className="nav nav-pills">
          {infoTabs.map((infoTab) => (
            <li className="nav-item">
              <NavLink to={infoTab.routerLink} className="nav-link">
                <span className="title-tab">{infoTab.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
