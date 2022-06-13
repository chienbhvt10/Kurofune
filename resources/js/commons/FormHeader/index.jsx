import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "../Breadcrumb";
import "./form-header.scss";
const FormHeader = ({ title, breadcrumb, onCancel, loading ,onSubmit }) => {
  const { t } = useTranslation();
  return (
    <div className="form-header">
      <Breadcrumb breadcrumb={breadcrumb} title={title} />
      <div className="btn-group">
        <Button type="button" className="header-btn cancel" onClick={onCancel}>
          {t("admins.btn_cancel")}
        </Button>
        <Button htmlType="submit" className="header-btn save"  onClick={onSubmit}>
          {t("admins.btn_save")}
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;
