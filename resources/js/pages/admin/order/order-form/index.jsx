import React from "react";
import "./order-form.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormHeader from "../../../../commons/FormHeader";
import SubForm from "./SubForm";
import CartInfoTable from "./CartInfoTable";

const credential = Yup.object().shape({});
const OrderForm = ({ item, typeForm, title, onCancel, onSave }) => {
  const lang = localStorage.getItem("lang");
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
  const initialBillingValue = {};
  const initialShippingValue = {};
  const cartInfo = [
    {
      product: "1",
      cost: "1",
      quantity: "1",
      total: "1",
      vat: "1",
    },
  ];
  const formik = useFormik({
    initialValues: initialCommonValues,
    validationSchema: credential,
    onSubmit: () => {
      const submitInput = {};
    },
  });
  const formikBilling = useFormik({
    initialValues: initialBillingValue,
    validationSchema: credential,
  });
  const formikShipping = useFormik({
    initialValues: initialBillingValue,
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
    <div id="order-form">
      <FormHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Order List", routerLink: `${lang}/admin/order-list` },
          {
            name: "Add",
            routerLink: "",
          },
        ]}
        title={title}
        onCancel={onCancel}
      />
      <p className="order-detail-title">Order #1723 details</p>
      <div className="order-info">
        <div className="general-info section-info">
          <p className="title-section">General</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Date created:</label>
              <div>
                <input
                  id=""
                  type="text"
                  name="classification"
                  className=""
                  onChange={formik.handleChange}
                  value={formik.values.classification}
                />
                @
                <input
                  id=""
                  type="number"
                  name="classification"
                  className=""
                  onChange={formik.handleChange}
                  value={formik.values.classification}
                />
                :
                <input
                  id=""
                  type="number"
                  name="classification"
                  className=""
                  onChange={formik.handleChange}
                  value={formik.values.classification}
                />
              </div>
              {renderErrorMessage("classification")}
            </div>
            <div className="form-group">
              <label>Status:</label>
              <input
                id=""
                type="text"
                name="classification"
                className=""
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.classification}
              />
              {renderErrorMessage("classification")}
            </div>
            <div className="form-group">
              <label>Customer:</label>
              <input
                id=""
                type="text"
                name="classification"
                className=""
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.classification}
              />
              {renderErrorMessage("classification")}
            </div>
          </form>
        </div>
        <div className="billing-info section-info">
          <p className="title-section">Billing</p>
          <SubForm formik={formikBilling} typeForm="BILLING" />
        </div>
        <div className="shipping-info section-info">
          <p className="title-section">Shipping</p>
          <SubForm formik={formikShipping} typeForm="SHIPPING" />
        </div>
      </div>
      <div className="cart-info">
        <CartInfoTable items={cartInfo} />
      </div>
    </div>
  );
};

export default OrderForm;
