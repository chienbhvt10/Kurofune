import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ title, breadcrumb }) => {
  return (
    <div className="user-header d-flex">
      <div className="user-title">
        <h3 className=" mr-3">{title}</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb px-2">
            {breadcrumb.map((item, index) => (
              <li
                className={"breadcrumb-item " + (breadcrumb.length - 1 == index ? "active" : "")}
              >
                {breadcrumb.length - 1 == index ? (
                  item.name
                ) : (
                  <Link to={item.routerLink}>{item.name}</Link>
                )}
              </li>
            ))}

          </ol>
        </nav>
      </div>
    </div>
  );
};
