import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumb = ({ title, breadcrumb }) => {
  return (
    <div className="user-header d-flex">
      <div className="user-title">
        <h3 className="" style={{ color: "#62a19b" }}>
          {title}
        </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb px-1 bg-white">
            {breadcrumb.map((item, index) => (
              <li
                key={index}
                className={
                  "breadcrumb-item " +
                  (breadcrumb.length - 1 == index ? "active" : "")
                }
              >
                {breadcrumb.length - 1 == index ? (
                  item.name
                ) : (
                  <Link
                    to={item.routerLink}
                    className="text-decoration-none"
                    style={{ color: "#62a19b" }}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
