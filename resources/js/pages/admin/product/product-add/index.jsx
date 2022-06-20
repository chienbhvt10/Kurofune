import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../../commons/Notification";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useProducts from "../../../../hooks/product/useProducts.js";
import ProductForm from "../product-form/ProductForm";
import useCreateProduct from "./../../../../hooks/product/useCreateProduct";

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
      <PageHead
        title={t("meta.title_product_create")}
        content={t("meta.content_product_create")}
      />
      <ProductForm
        typeForm={TYPE_FORM_CREATE}
        title={t("admins.product.title.product_title")}
        onCancel={onCancel}
        onSave={onSave}
        response={resCreateProduct}
      />
    </div>
  );
};

export default AddProduct;
