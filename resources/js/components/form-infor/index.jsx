import { useFormik } from "formik";
import postal_code from "japan-postal-code";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { PREF } from "../../commons/data";
import RenderFormikErrorMessage from "../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import "./style.scss";
const credential = Yup.object().shape(
  {
    name: Yup.string().required("Name require"),
    full_name: Yup.string(),
    to_code: Yup.string()
      .max(3, "Only 3 character in first postal code")
      .when("from_code", {
        is: (fieldTwo) => !fieldTwo || fieldTwo.length === 0,
        then: Yup.string().required("At least one of the fields is required"),
      }),
    from_code: Yup.string()
      .max(4, "Only 4 character in second postal code")
      .when("to_code", {
        is: (fieldOne) => !fieldOne || fieldOne.length === 0,
        then: Yup.string().required("At least one of the fields is required"),
      }),
    prefecture: Yup.string().required("Prefecture require"),
    city: Yup.string().required("Town / City require"),
    street_address: Yup.string().required("Street address require"),
    phone: Yup.string(),
    email: Yup.string().required("Email address require"),
  }[("to_code", "from_code")]
);
export const FormInfor = ({ onSave, item, typeForm }) => {
  const { i18n, t } = useTranslation();
  const billingInitValues = {
    name: "",
    full_name: item?.billing_address?.full_name || "",
    to_code: item?.billing_address?.postal_code?.slice(0, 3) || "",
    from_code: item?.billing_address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.billing_address?.prefecture || "",
    city: item?.billing_address?.city || "",
    street_address: item?.billing_address?.street_address || "",
    building: item?.billing_address?.building || "",
    phone: item?.billing_address?.phone || "",
    email: item?.billing_address?.email || "",
  };
  const shippingInitValues = {
    name: "",
    full_name: item?.shipping_address?.full_name || "",
    to_code: item?.shipping_address?.postal_code?.slice(0, 3) || "",
    from_code: item?.shipping_address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.shipping_address?.prefecture || "",
    city: item?.shipping_address?.city || "",
    street_address: item?.shipping_address?.street_address || "",
    building: item?.shipping_address?.building || "",
    phone: item?.shipping_address?.phone || "",
    email: item?.shipping_address?.email || "",
  };
  const profileInitValues = {
    name: item?.name || "",
    full_name: "",
    to_code: item?.address?.postal_code?.slice(0, 3) || "",
    from_code: item?.address?.postal_code?.slice(3, 7) || "",
    prefecture: item?.address?.prefecture || "",
    city: item?.address?.city || "",
    street_address: item?.address?.street_address || "",
    building: item?.address?.building || "",
    phone: item?.phone || "",
    email: item?.email || "",
  };

  React.useEffect(() => {
    if (typeForm === "billing") {
      formInfoFormik.setValues(billingInitValues);
    } else if (typeForm === "shipping") {
      formInfoFormik.setValues(shippingInitValues);
    } else if (typeForm === "profile") {
      formInfoFormik.setValues(profileInitValues);
    }
  }, [item]);

  const formInfoFormik = useFormik({
    initialValues: profileInitValues,
    validationSchema: credential,
    onSubmit: () => {
      onSave();
    },
  });
  const onCodeJapan = () => {
    if (formInfoFormik.values.to_code && formInfoFormik.values.from_code) {
      const code =
        formInfoFormik.values.to_code + formInfoFormik.values.from_code;
      postal_code.get(code, (address) => {
        if (address.prefecture || address.city || address.area) {
          formInfoFormik.setFieldValue("prefecture", address.prefecture);
          formInfoFormik.setFieldValue("city", address.city);
          formInfoFormik.setFieldValue("street_address", address.area);
        }
      });
    }
  };
  return (
    <form id="form-infor" onSubmit={formInfoFormik.handleSubmit}>
      <div className="row">
        <div className="form-group">
          <label htmlFor="name">
            {t("member.change_profile.field_full_name")}
            <span>*</span>
          </label>
          <input
            id="name"
            type="text"
            name={typeForm === "profile" ? "name" : "full_name"}
            className="form-control-auth"
            onChange={formInfoFormik.handleChange}
            value={
              typeForm === "profile"
                ? formInfoFormik.values.name
                : formInfoFormik.values.full_name
            }
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field={typeForm === "profile" ? "name" : "full_name"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">
            {t("member.change_profile.field_postal")}
            <span>*</span>
          </label>
          <div id="postalCode" className="input-postal-code">
            <input
              type="text"
              name="to_code"
              className="form-control-postal-code mr-2"
              id="toPostalCode"
              onChange={formInfoFormik.handleChange}
              value={formInfoFormik.values.to_code}
            />
            <input
              type="text"
              name="from_code"
              className="form-control-postal-code ml-2"
              id="fromPostalCode"
              onChange={formInfoFormik.handleChange}
              value={formInfoFormik.values.from_code}
            />
            <button type="button" className="btn-search" onClick={onCodeJapan}>
              {t("member.change_profile.btn_search")}
            </button>
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
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.prefecture}
          >
            <option disabled></option>
            {PREF.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="prefecture"
          />
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
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.city}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">
            {t("member.change_profile.field_street")}
            <span>*</span>
          </label>
          <input
            name="street_address"
            type="text"
            className="form-control-auth"
            id="street"
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.street_address}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="street_address"
          />
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
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.building}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="building"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            {t("member.change_profile.field_phone")}
          </label>
          <input
            name="phone"
            type="text"
            className="form-control-auth"
            id="phone"
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.phone}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="phone"
          />
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
            onChange={formInfoFormik.handleChange}
            value={formInfoFormik.values.email}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFormik}
            field="email"
          />
        </div>
      </div>
      <button className="btn btn-primary d-block ml-auto" type="submit">
        {t("member.user_profile.btn_save")}
      </button>
    </form>
  );
};
