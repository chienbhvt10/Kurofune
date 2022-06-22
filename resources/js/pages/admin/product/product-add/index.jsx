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
    createNewProduct(data);
  };

  React.useEffect(() => {
    if (resCreateProduct?.error_code === "NO_ERROR") {
      navigate(`${lang}/admin/product-list`);
      getAllProducts();
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
