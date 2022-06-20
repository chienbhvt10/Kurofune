import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import OrderForm from "../order-form";

const AddOrder = () => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/order-list`);
  };
  return (
    <div id="add-order-page">
      <PageHead
        title={t("meta.title_order_create")}
        content={t("meta.content_order_create")}
      />
      <OrderForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddOrder;
