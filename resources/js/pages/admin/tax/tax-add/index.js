import React from "react";
import { useNavigate } from "react-router-dom";
import TaxForm from "../tax-form/index.js";
import { t } from "i18next";
import useCreateTax from "../../../../hooks/tax/useCreateTax.js";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";

const AddTax = () => {
  const lang = getCurrentLanguage();
  const { createTax, resAddTax } = useCreateTax();
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`${lang}/admin/tax-list`);
  };
  const onSave = (data) => {
    createTax(data);
  };

  return (
    <div id="add-tax-page">
      <TaxForm
        title={t("admins.tax.title.add_tax")}
        onCancel={onCancel}
        onSave={onSave}
        response={resAddTax}
      />
    </div>
  );
};

export default AddTax;
