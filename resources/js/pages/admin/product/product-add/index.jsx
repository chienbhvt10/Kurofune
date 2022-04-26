import React from "react";
import { TYPE_FORM_ADD } from "../../../../constants";
import ProductForm from "../product-form/ProductForm";

const AddProduct = () => {
  return (
    <div id="add-product-page">
      <ProductForm typeForm={TYPE_FORM_ADD} title="Add Product" />
    </div>
  );
};

export default AddProduct;
