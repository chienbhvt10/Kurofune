import React from "react";
import { Link } from "react-router-dom";

const NavigateLink = ({ navigateItems }) => {
  return (
    <div className="navbar-main-wrapper">
      <ul className="nav navbar-nav">
        {navigateItems.map((item, index) => (
          <li className="menu-item" key={index}>
            <Link className="nav-link" to={item.link}>
              <img className="icon" src={item.imageUrl} />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigateLink;
