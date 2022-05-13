import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../../commons/Breadcrumb";
import "./table-header.scss";
export const TableHeader = ({ children, title, breadcrumb, addLink }) => {
  return (
    <>
      <Breadcrumb title={title} breadcrumb={breadcrumb} />
      <div className="user-tab my-3 d-flex">
        {addLink ? (
          <Link
            className="btn btn-outline-secondary mr-3 "
            role="button"
            to={addLink}
          >
            <FontAwesomeIcon className="mr-1" icon={faPlus} />
            Add new
          </Link>
        ) : (
          <></>
        )}
        {children}
        <div className="user-search ml-auto">
          <div className="input-group">
            <input
              type="text"
              className="text-input p-1"
              placeholder="Search username"
              aria-label="Search username"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};