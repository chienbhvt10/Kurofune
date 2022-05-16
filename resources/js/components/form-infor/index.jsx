import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { PREF } from "../../commons/data";
import postal_code from "japan-postal-code";
import RenderFormikErrorMessage from "../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import "./style.scss";

const credential = Yup.object().shape(
  {
    name: Yup.string().required("Name require"),
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

export const FormInfor = ({ onSave, item }) => {
  const { i18n, t } = useTranslation();

  const formInfoInitValues = {
    name: item?.name || "",
    toPostalCode: item?.address?.toPostalCode || "",
    fromPostalCode: item?.address?.fromPostalCode || "",
    prefecture: item?.address?.prefecture || "",
    city: item?.address?.city || "",
    street_address: item?.address?.street_address || "",
    building: item?.address?.building || "",
    phone: item?.phone || "",
    email: item?.email || "",
  };
  React.useEffect(() => {
    formInfoFomik.setValues(formInfoInitValues);
  }, [item]);
  const formInfoFomik = useFormik({
    initialValues: formInfoInitValues,
    validationSchema: credential,
    onSubmit: () => {
      onSave();
    },
  });

  const renderErrorMessage = (field) => {
    return (
      formInfoFomik.touched[field] && (
        <div className="form-error">{formInfoFomik.errors[field]}</div>
      )
    );
  };
  const onCodeJapan = () => {
    if (
      formInfoFomik.values.toPostalCode &&
      formInfoFomik.values.fromPostalCode
    ) {
      const code =
        formInfoFomik.values.toPostalCode + formInfoFomik.values.fromPostalCode;
      postal_code.get(code, (address) => {
        if (address.prefecture || address.city || address.street) {
          formInfoFomik.setFieldValue("prefecture", address.prefecture);
          formInfoFomik.setFieldValue("city", address.city);
          formInfoFomik.setFieldValue("area", address.area);
        }
      });
    }
  };
  return (
    <form id="form-infor" onSubmit={formInfoFomik.handleSubmit}>
      <div className="row">
        <div className="form-group">
          <label htmlFor="name">
            {t("member.change_profile.field_full_name")}
            <span>*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control-auth"
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.name}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
            field="name"
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
              name="toPostalCode"
              className="form-control-postal-code mr-2"
              id="toPostalCode"
              onChange={formInfoFomik.handleChange}
              value={formInfoFomik.values.toPostalCode}
            />
            <input
              type="text"
              name="fromPostalCode"
              className="form-control-postal-code ml-2"
              id="fromPostalCode"
              onChange={formInfoFomik.handleChange}
              value={formInfoFomik.values.fromPostalCode}
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.prefecture}
          >
            <option disabled></option>
            {PREF.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.city}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.street_address}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.building}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
            field="building"
          />
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.phone}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
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
            onChange={formInfoFomik.handleChange}
            value={formInfoFomik.values.email}
          />
          <RenderFormikErrorMessage
            formikInstance={formInfoFomik}
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
