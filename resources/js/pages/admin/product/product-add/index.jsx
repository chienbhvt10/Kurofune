import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_ADD } from "../../../../constants";
import ProductForm from "../product-form/ProductForm";
import useCreateProduct from "./../../../../hooks/product/useCreateProduct";

const AddProduct = () => {
  const lang = localStorage.getItem("lang");
  const { createNewProduct, resCreateProduct } = useCreateProduct();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(`${lang}/admin/product-list`);
  };
  const onSave = (data) => {
    // createNewProduct(data);
    console.log(data);
  };

  React.useEffect(() => {
    if (resCreateProduct?.status_code === 200) {
      NotificationSuccess("Thông báo", "Thêm Product thành công");
      navigate(`${lang}/admin/product-list`);
      getAllProducts();
    }
  }, [resCreateProduct]);
  return (
    <div id="add-product-page">
      <ProductForm
        typeForm={TYPE_FORM_ADD}
        title="Add Product"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default AddProduct;
