import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./back-button.scss";
const BackButton = ({ currentPath, backTo, title }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.match(currentPath) ? (
        <div className="back-block">
          <Link to={backTo}>
            <span className="icon-back">
              <img src="/images/medicine-list/icon-back.png" />
            </span>
            <div className="text-back">{title}</div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default BackButton;
