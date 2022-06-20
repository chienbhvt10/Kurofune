import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import OrderForm from "../order-form";

const UpdateOrder = () => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/order-list`);
  };
  return (
    <div id="add-order-page">
      <PageHead
        title={t("meta.title_order_update")}
        content={t("meta.content_order_update")}
      />
      <OrderForm
        typeForm={TYPE_FORM_UPDATE}
        title="Update Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default UpdateOrder;
