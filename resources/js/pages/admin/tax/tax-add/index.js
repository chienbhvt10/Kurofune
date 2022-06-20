import React from "react";
import { useNavigate } from "react-router-dom";
import TaxForm from "../tax-form/index.js";
import { t } from "i18next";
import useCreateTax from "../../../../hooks/tax/useCreateTax.js";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import PageHead from "../../../../commons/PageHead/index.jsx";
import { useTranslation } from "react-i18next";

const AddTax = () => {
  const lang = getCurrentLanguage();
  const { createTax, resAddTax } = useCreateTax();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onCancel = () => {
    navigate(`${lang}/admin/tax-list`);
  };
  const onSave = (data) => {
    createTax(data);
  };

  return (
    <div id="add-tax-page">
      <PageHead
        title={t("meta.title_tax_create")}
        content={t("meta.content_tax_create")}
      />
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
