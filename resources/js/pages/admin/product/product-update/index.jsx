import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../../commons/Notification/index.jsx";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import useProductDetail from "../../../../hooks/product/useProductDetail";
import useProducts from "../../../../hooks/product/useProducts.js";
import ProductForm from "../product-form/ProductForm";
import useUpdateProduct from "./../../../../hooks/product/useUpdateProduct";
import { Spin } from "antd";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang");
  const { t } = useTranslation();
  const { getAllProducts } = useProducts();

  const { getProduct, product, loadingProduct } = useProductDetail();
  const { updateProduct, resUpdateProduct, loadingUpdateProduct } =
    useUpdateProduct();
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

  return (
    <div id="update-product-page">
      <Spin spinning={loadingProduct} tip="Loading...">
        <ProductForm
          item={product}
          typeForm={TYPE_FORM_UPDATE}
          title="Update Product"
          onCancel={onCancel}
          onSave={onSave}
          response={resUpdateProduct}
          loading={loadingUpdateProduct}
        />
      </Spin>
    </div>
  );
};

export default UpdateProduct;
