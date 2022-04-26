import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import ProductForm from "../product-form/ProductForm";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/admin/product-list");
  };
  const onSave = () => {};
  const item = {
    name: "",
    sku: "",
    stockStatus: "",
    price: 0,
    status: "",
    productImage: "",
    tax: "",
    ja: {
      locale: "ja",
      classification: "ja",
      features: "ja",
      precautions: "ja",
      efficacyEffect: "ja",
      usageDoes: "ja",
      activeIngredients: "ja",
      additives: "ja",
      precautionsStorageHandling: "ja",
      manufacturer: "ja",
    },
    vi: {
      locale: "vi",
      classification: "vi",
      features: "vi",
      precautions: "vi",
      efficacyEffect: "vi",
      usageDoes: "vi",
      activeIngredients: "vi",
      additives: "vi",
      precautionsStorageHandling: "vi",
      manufacturer: "vi",
    },
    tl: {
      locale: "tl",
      classification: "tl",
      features: "tl",
      precautions: "tl",
      efficacyEffect: "tl",
      usageDoes: "tl",
      activeIngredients: "tl",
      additives: "tl",
      precautionsStorageHandling: "tl",
      manufacturer: "tl",
    },
    zh: {
      locale: "zh",
      classification: "zh",
      features: "zh",
      precautions: "zh",
      efficacyEffect: "zh",
      usageDoes: "zh",
      activeIngredients: "zh",
      additives: "zh",
      precautionsStorageHandling: "zh",
      manufacturer: "zh",
    },
    en: {
      locale: "en",
      classification: "en",
      features: "en",
      precautions: "en",
      efficacyEffect: "en",
      usageDoes: "en",
      activeIngredients: "en",
      additives: "en",
      precautionsStorageHandling: "en",
      manufacturer: "en",
    },
  };
  return (
    <div id="update-product-page">
      <ProductForm
        item={item}
        typeForm={TYPE_FORM_UPDATE}
        title="Update Product"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default UpdateProduct;
