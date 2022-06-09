import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage";
import "./navigate-link.scss";
import { useSelector } from "react-redux";
import { isAdmin } from "../../helper/roles";
const NavigateLink = ({ navigateItems, onClick }) => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { profile, userInfo } = useSelector((state) => state.authState);


  return (
    <div className="navbar-main-wrapper">
      <ul className="nav navbar-nav">
        {navigateItems
          .filter((item) =>
            isAdmin(profile?.roles) || isAdmin(userInfo?.roles?.name)
              ? item
              : !item?.isAdminOnly
          )
          .map((item, index) => (
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
