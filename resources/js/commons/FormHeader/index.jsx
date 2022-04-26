import React from "react";
import "./form-header.scss";
const FormHeader = ({ title, onCancel }) => {
  return (
    <div className="form-header">
      <span className="form-title">{title}</span>
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
