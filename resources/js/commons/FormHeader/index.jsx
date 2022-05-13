import React from "react";
import { Breadcrumb } from "../Breadcrumb";
import "./form-header.scss";
const FormHeader = ({ title, breadcrumb, onCancel, children }) => {
  return (
    <div className="form-header">
      <Breadcrumb breadcrumb={breadcrumb} title={title} />
      <div className="btn-group">
        <button type="button" className="header-btn cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="header-btn save">
          Save
        </button>
      </div>
    </div>
  );
};

export default FormHeader;
