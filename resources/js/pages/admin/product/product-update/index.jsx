import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../../commons/Notification/index.jsx";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import useProductDetail from "../../../../hooks/product/useProductDetail";
import useProducts from "../../../../hooks/product/useProducts.js";
import ProductForm from "../product-form/ProductForm";
import useUpdateProduct from "./../../../../hooks/product/useUpdateProduct";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const { getAllProducts } = useProducts();

  const { getProduct, product } = useProductDetail();
  const { updateProduct, resUpdateProduct } = useUpdateProduct();
  const onCancel = () => {
    navigate(`${lang}/admin/product-list`);
  };
  const onSave = (data) => {
    updateProduct(data);
  };

  React.useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (resUpdateProduct?.error_code === "NO_ERROR") {
      navigate(`${lang}/admin/product-list`);
      getAllProducts();
    }
  }, [resUpdateProduct]);

  return (
    <div id="update-product-page">
      <PageHead
        title={t("meta.title_product_update")}
        content={t("meta.content_product_update")}
      />
      <ProductForm
        item={product}
        typeForm={TYPE_FORM_UPDATE}
        title="Update Product"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default UpdateProduct;
