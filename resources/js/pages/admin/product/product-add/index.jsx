import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import ProductForm from "../product-form/ProductForm";

const AddProduct = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/product-list`);
  };
  return (
    <div id="add-product-page">
      <ProductForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddProduct;
