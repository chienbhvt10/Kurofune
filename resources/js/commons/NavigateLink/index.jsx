import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./navigate-link.scss";
const NavigateLink = ({ navigateItems, onClick }) => {
  let lang = localStorage.getItem("lang");
  const { i18n, t } = useTranslation();

  return (
    <div className="navbar-main-wrapper">
      <ul className="nav navbar-nav">
        {navigateItems.map((item, index) => (
          <li className="menu-item" key={index}>
            <Link
              className="nav-link"
              to={`${lang}/${item.link}`}
              onClick={onClick}
            >
              <img className="icon" src={item.imageUrl} />
              <span>{t(item.title)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigateLink;
