import { Spin } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import TaxForm from "../tax-form";
import useTax from "../../../../hooks/tax/useTax";
import useUpdateTax from "../../../../hooks/tax/useUpdateTax";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import PageHead from "../../../../commons/PageHead";

const UpdateTax = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id } = useParams();
  const { getTax, tax, loadingTax } = useTax();
  const { resUpdateTax, updateTax, loadingUpdateTax } = useUpdateTax();

  const onCancel = () => {
    navigate(`${lang}/admin/tax-list`);
  };
  const onSave = (data) => {
    updateTax(data);
  };

  React.useEffect(() => {
    if (id) {
      getTax(id);
    }
  }, [id]);

  return (
    <div id="update-category-page">
      <PageHead
        title={t("meta.title_tax_update")}
        content={t("meta.content_tax_update")}
      />
      <Spin spinning={loadingTax} tip="Loading...">
        {tax && (
          <TaxForm
            loading={loadingUpdateTax}
            item={tax}
            typeForm={TYPE_FORM_UPDATE}
            title="Update Tax"
            onCancel={onCancel}
            onSave={onSave}
            response={resUpdateTax}
          />
        )}
      </Spin>
    </div>
  );
};

export default UpdateTax;
