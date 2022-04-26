import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { PREF } from "../../commons/data";
import postal_code from "japan-postal-code";
import "./style.scss";

const credential = Yup.object().shape(
  {
    fullName: Yup.string().required("Full Name require"),
    toPostalCode: Yup.string().when("fromPostalCode", {
      is: (fieldTwo) => !fieldTwo || fieldTwo.length === 0,
      then: Yup.string().required("At least one of the fields is required"),
    }),
    fromPostalCode: Yup.string().when("toPostalCode", {
      is: (fieldOne) => !fieldOne || fieldOne.length === 0,
      then: Yup.string().required("At least one of the fields is required"),
    }),
    prefecture: Yup.string().required("Prefecture require"),
    city: Yup.string().required("Town / City require"),
    area: Yup.string().required("Street address require"),
    building: "",
    phone: Yup.string().required("Phone require"),
    email: Yup.string().required("Email address require"),
  },
  ["toPostalCode", "fromPostalCode"]
);

export const FormInfor = ({ onSubmit, item }) => {
  const { i18n, t } = useTranslation();

  const initialValues = {
    fullName: item.fullName,
    toPostalCode: item.toPostalCode,
    fromPostalCode: item.fromPostalCode,
    prefecture: item.prefecture,
    city: item.city,
    area: item.street,
    building: item.building,
    phone: item.phone,
    email: item.email,
  };

  const renderErrorMessage = (field) => {
    return (
      formik.touched[field] && (
        <div className="form-error">{formik.errors[field]}</div>
      )
    );
  };
  const onCodeJapan = () => {
    if (formik.values.toPostalCode && formik.values.fromPostalCode) {
      const code = formik.values.toPostalCode + formik.values.fromPostalCode;
      postal_code.get(code, (address) => {
        console.log(address);
        if (address.prefecture || address.city || address.street) {
          formik.setFieldValue("prefecture", address.prefecture);
          formik.setFieldValue("city", address.city);
          formik.setFieldValue("area", address.area);
        }
      });
    }
  };
  return (
    <form id="form-infor" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="form-group">
          <label htmlFor="fullName">
            {t("member.change_profile.field_full_name")}
            <span>*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-control-auth"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {renderErrorMessage("fullName")}
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">
            {t("member.change_profile.field_postal")}
            <span>*</span>
          </label>
          <div id="postalCode" className="input-postal-code">
            <input
              type="text"
              name="toPostalCode"
              className="form-control-postal-code mr-2"
              id="toPostalCode"
              onChange={formik.handleChange}
              value={formik.values.toPostalCode}
            />
            <input
              type="text"
              name="fromPostalCode"
              className="form-control-postal-code ml-2"
              id="fromPostalCode"
              onChange={formik.handleChange}
              value={formik.values.fromPostalCode}
            />
            <button type="button" className="btn-search" onClick={onCodeJapan}>
              {t("member.change_profile.btn_search")}
            </button>
            {renderErrorMessage("toPostalCode") ||
              renderErrorMessage("fromPostalCode")}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="prefecture">
            {t("member.change_profile.field_prefecture")}
            <span>*</span>
          </label>
          <select
            name="prefecture"
            as="select"
            className="p-0 form-control-auth"
            onChange={formik.handleChange}
            value={formik.values.prefecture}
          >
            <option disabled></option>
            {PREF.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          {renderErrorMessage("prefecture")}
        </div>
        <div className="form-group">
          <label htmlFor="city">
            {t("member.change_profile.field_city")} <span>*</span>
          </label>
          <input
            name="city"
            type="text"
            className="form-control-auth"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {renderErrorMessage("city")}
        </div>
        <div className="form-group">
          <label htmlFor="street">
            {t("member.change_profile.field_street")}
            <span>*</span>
          </label>
          <input
            name="area"
            type="text"
            className="form-control-auth"
            id="street"
            onChange={formik.handleChange}
            value={formik.values.area}
          />
          {renderErrorMessage("area")}
        </div>
        <div className="form-group">
          <label htmlFor="building">
            {t("member.change_profile.field_building")}
          </label>
          <input
            name="building"
            type="text"
            className="form-control-auth"
            id="building"
            onChange={formik.handleChange}
            value={formik.values.building}
          />
          {renderErrorMessage("building")}
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            {t("member.change_profile.field_phone")}
            <span>*</span>
          </label>
          <input
            name="phone"
            type="text"
            className="form-control-auth"
            id="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {renderErrorMessage("phone")}
        </div>
        <div className="form-group">
          <label htmlFor="email">
            {t("member.change_profile.field_email")}
            <span>*</span>
          </label>
          <input
            name="email"
            type="text"
            className="form-control-auth"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {renderErrorMessage("email")}
        </div>
      </div>
      <button className="btn btn-primary d-block ml-auto" type="submit">
        {t("member.user_profile.btn_save")}
      </button>
    </form>
  );
};
