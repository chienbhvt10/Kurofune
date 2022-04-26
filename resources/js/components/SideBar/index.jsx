import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { navigateLinkData } from "../../commons/data";
import NavigateLink from "../../commons/NavigateLink";
import "./side-bar.scss";

const SideBar = ({ show, toggleSideBar, closeSideBar,styleColor }) => {
  const { t } = useTranslation();
  return (
    <div id="side-bar" style={{backgroundColor:styleColor}} className={show ? "show" : ""}>
      <div className="task-bar-title">
        {t("navigate_link.title")}
        <div className={show ? "btn_toggle show" : "btn_toggle"}>
          <FontAwesomeIcon
            onClick={toggleSideBar}
            icon={faArrowCircleLeft}
            color="#58918B"
            size="lg"
          />
        </div>
      </div>
      <NavigateLink navigateItems={navigateLinkData} onClick={closeSideBar} />
    </div>
  );
};

export default SideBar;
