import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormHeader from "../../../../commons/FormHeader";
import "./product-form.scss";
import TranslateProductForm from "./TranslateProductForm";

const credential = Yup.object().shape({});
const ProductForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const initialCommonValues = {
    name: "",
    sku: "",
    stockStatus: "",
    price: 0,
    status: "",
    productImage: "",
    tax: "",
    meta_title: "",
    meta_description: "",
    meta_keyword: "",
  };

  const formik = useFormik({
    initialValues: initialCommonValues,
    validationSchema: credential,
    onSubmit: () => {
      const submitInput = {
        ...formik.values,
        ja: {
          ...formikJP.values,
        },
        vi: {
          ...formikVI.values,
        },
        tl: {
          ...formikTL.values,
        },
        zh: {
          ...formikZH.values,
        },
        en: {
          ...formikEN.values,
        },
      };
      console.log("submit input ", submitInput);
    },
  });
  const initialTranslateValues = {
    locale: "",
    classification: "",
    features: "",
    precautions: "",
    efficacyEffect: "",
    usageDoes: "",
    activeIngredients: "",
    additives: "",
    precautionsStorageHandling: "",
    manufacturer: "",
  };
  const formikJP = useFormik({
    initialValues: item?.ja || initialTranslateValues,
    validationSchema: credential,
  });
  const formikVI = useFormik({
    initialValues: item?.vi || initialTranslateValues,
    validationSchema: credential,
  });
  const formikTL = useFormik({
    initialValues: item?.tl || initialTranslateValues,
    validationSchema: credential,
  });
  const formikEN = useFormik({
    initialValues: item?.en || initialTranslateValues,
    validationSchema: credential,
  });
  const formikZH = useFormik({
    initialValues: item?.zh || initialTranslateValues,
    validationSchema: credential,
  });

  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  return (
    <div id="product-form">
      <form onSubmit={formik.handleSubmit}>
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            { name: "Product List", routerLink: "/admin/product-list" },
            { name: "Add", routerLink: "/admin/product/add" },
          ]}
          title={title}
          onCancel={onCancel}
        />
        <div className="separate">
          <div className="form-group">
            <label>Name</label>
            <input
              id=""
              type="text"
              name="name"
              className=""
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {renderErrorMessage("name")}
          </div>
          <div className="form-group">
            <label>Sku</label>
            <input
              id=""
              type="text"
              name="sku"
              className=""
              onChange={formik.handleChange}
              value={formik.values.sku}
            />
            {renderErrorMessage("sku")}
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Stock Status</label>
            <input
              id=""
              type="text"
              name="stockStatus"
              className=""
              onChange={formik.handleChange}
              value={formik.values.stockStatus}
            />
            {renderErrorMessage("stockStatus")}
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              id=""
              type="text"
              name="price"
              className=""
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {renderErrorMessage("price")}
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Status</label>
            <input
              id=""
              type="text"
              name="status"
              className=""
              onChange={formik.handleChange}
              value={formik.values.status}
            />
            {renderErrorMessage("status")}
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <input
              id=""
              type="text"
              name="productImage"
              className=""
              onChange={formik.handleChange}
              value={formik.values.productImage}
            />
            {renderErrorMessage("productImage")}
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>Tax</label>
            <input
              id=""
              type="text"
              name="tax"
              className=""
              onChange={formik.handleChange}
              value={formik.values.tax}
            />
            {renderErrorMessage("tax")}
          </div>
          <div className="form-group">
            <label>meta_title</label>
            <input
              id=""
              type="text"
              name="meta_title"
              className=""
              onChange={formik.handleChange}
              value={formik.values.meta_title}
            />
            {renderErrorMessage("meta_title")}
          </div>
        </div>
        <div className="separate">
          <div className="form-group">
            <label>meta_description</label>
            <input
              id=""
              type="text"
              name="meta_description"
              className=""
              onChange={formik.handleChange}
              value={formik.values.meta_description}
            />
            {renderErrorMessage("meta_description")}
          </div>
          <div className="form-group">
            <label>meta_keyword</label>
            <input
              id=""
              type="text"
              name="meta_keyword"
              className=""
              onChange={formik.handleChange}
              value={formik.values.meta_keyword}
            />
            {renderErrorMessage("meta_keyword")}
          </div>
        </div>
      </form>
      <TranslateProductForm
        formikEN={formikEN}
        formikJP={formikJP}
        formikTL={formikTL}
        formikVI={formikVI}
        formikZH={formikZH}
      />
    </div>
  );
};

export default ProductForm;
