import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_ADD } from "../../../../constants";
import ProductForm from "../product-form/ProductForm";
import useCreateProduct from "./../../../../hooks/product/useCreateProduct";
import { NotificationSuccess } from "../../../../commons/Notification";
import useProducts from "../../../../hooks/product/useProducts.js";

const AddProduct = () => {
  const lang = localStorage.getItem("lang");
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
        response={resCreateProduct}
      />
    </div>
  );
};

export default AddProduct;
