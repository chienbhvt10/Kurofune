import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import OrderForm from "../order-form";

const UpdateOrder = () => {
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/order-list`);
  };
  return (
    <div id="add-order-page">
      <OrderForm
        typeForm={TYPE_FORM_UPDATE}
        title="Update Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default UpdateOrder;
