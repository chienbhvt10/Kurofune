import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import OrderForm from "../order-form";

const AddOrder = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/order-list`);
  };
  return (
    <div id="add-order-page">
      <OrderForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddOrder;
