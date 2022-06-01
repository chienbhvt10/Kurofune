import React from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../Breadcrumb";
import "./form-header.scss";
const FormHeader = ({ title, breadcrumb, onCancel }) => {
  const { t } = useTranslation();
  return (
    <div className="form-header">
      <Breadcrumb breadcrumb={breadcrumb} title={title} />
      <div className="btn-group">
        <button type="button" className="header-btn cancel" onClick={onCancel}>
          {t("admins.btn_cancel")}
        </button>
        <button type="submit" className="header-btn save">
          {t("admins.btn_save")}
        </button>
      </div>
    </div>
  );
};

export default FormHeader;
