import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import useProductDetail from "../../../../hooks/product/useProductDetail";
import ProductForm from "../product-form/ProductForm";
import useUpdateProduct from "./../../../../hooks/product/useUpdateProduct";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProduct, product } = useProductDetail();
  const { updateProduct } = useUpdateProduct();
  const onCancel = () => {
    navigate("/admin/product-list");
  };
  const onSave = (data) => {
    updateProduct(data);
  };

  React.useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);
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
