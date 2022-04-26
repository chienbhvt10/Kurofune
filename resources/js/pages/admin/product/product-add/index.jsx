import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_ADD } from "../../../../constants";
import ProductForm from "../product-form/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/admin/product-list");
  };
  return (
    <div id="add-product-page">
      <ProductForm
        typeForm={TYPE_FORM_ADD}
        title="Add Product"
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddProduct;
