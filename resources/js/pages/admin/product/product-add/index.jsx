import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import ProductForm from "../product-form/ProductForm";
import useCreateProduct from "./../../../../hooks/product/useCreateProduct";
import {
  NotificationSuccess,
  NotificationError,
} from "../../../../commons/Notification";
import useProducts from "../../../../hooks/product/useProducts.js";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { getAllProducts, products } = useProducts();
  const { createNewProduct, resCreateProduct } = useCreateProduct();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/product-list`);
  };
  const onSave = (data) => {
    const submitData = {
      ...data,
      tax_id: Number(data.tax_id),
      price: Number(data.price),
    };

    createNewProduct(submitData);
  };

  React.useEffect(() => {
    if (resCreateProduct?.error_code === "NO_ERROR") {
      NotificationSuccess(t("notification"), resCreateProduct.message);
      navigate(`${lang}/admin/product-list`);
      getAllProducts();
    }
    if (resCreateProduct?.error_code === "ERROR") {
      const errorData = resCreateProduct?.error_data;
      errorData &&
        errorData?.slug &&
        NotificationError(t("notification"), errorData?.slug);
      errorData &&
        errorData?.sku &&
        NotificationError(t("notification"), errorData?.sku);
    }
  }, [resCreateProduct]);
  return (
    <div id="add-product-page">
      <ProductForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Product"
        onCancel={onCancel}
        onSave={onSave}
        response={resCreateProduct}
      />
    </div>
  );
};

export default AddProduct;
