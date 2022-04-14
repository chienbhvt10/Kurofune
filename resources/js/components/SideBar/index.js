import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { navigateLinkData } from "../../commons/data";
import NavigateLink from "../../commons/NavigateLink";
import "./side-bar.scss";

const SideBar = ({ show, toggleSideBar }) => {
  return (
    <div id="side-bar" className={show ? "show" : ""}>
      <div className="task-bar-title">
        Hiệu thuốc Online
        <div className={show ? "btn_toggle show" : "btn_toggle"}>
          <FontAwesomeIcon
            onClick={toggleSideBar}
            icon={faArrowCircleLeft}
            color="#58918B"
            size="lg"
          />
        </div>
      </div>
      <NavigateLink navigateItems={navigateLinkData} />
    </div>
  );
};

export default SideBar;
