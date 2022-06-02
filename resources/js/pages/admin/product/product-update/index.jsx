import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification/index.jsx";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import useProductDetail from "../../../../hooks/product/useProductDetail";
import ProductForm from "../product-form/ProductForm";
import useUpdateProduct from "./../../../../hooks/product/useUpdateProduct";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang");

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
    if (resUpdateProduct?.status_code === 200) {
      navigate(`${lang}/admin/product-list`);
      NotificationSuccess("Thông báo", resUpdateProduct.message);
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
