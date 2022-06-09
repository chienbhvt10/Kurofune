import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification/index.jsx";
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
    const submitData = {
      ...data,
      id: id,
      tax_id: Number(data.tax_id),
      price: Number(data.price),
    };

    updateProduct(submitData);
  };

  React.useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (resUpdateProduct?.error_code === "NO_ERROR") {
      navigate(`${lang}/admin/product-list`);
      NotificationSuccess(
        t("admins.product.notification"),
        resUpdateProduct.message
      );
      getAllProducts();
    }
  }, [resUpdateProduct]);
  return (
    <div id="update-product-page">
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
