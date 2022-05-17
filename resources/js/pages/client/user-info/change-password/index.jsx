import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import RenderFormikErrorMessage from "../../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import "./style.scss";
import * as Yup from "yup";
import useChangePassword from "../../../../hooks/user/useChangePassword";
import { useDispatch } from "react-redux";
import RenderApiErrorMessage from "../../../../commons/RenderErrorMessage/RenderApiErrorMessage";

const validateChangePasswordForm = Yup.object().shape({
  current_password: Yup.string().required("Current Password Require"),
  password: Yup.string().required("Password Require"),
  password_confirmation: Yup.string()
    .required("Confirm Password Require")
    .oneOf([Yup.ref("password"), null], "Confirm password must match password"),
});

export const ChangePassword = () => {
  const { i18n, t } = useTranslation();
  const { changePassword, response } = useChangePassword();
  const dispatch = useDispatch();
  const changePasswordInitValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };
  const changePasswordFormik = useFormik({
    initialValues: changePasswordInitValues,
    onSubmit: () => {
      changePassword(changePasswordFormik.values);
    },
    validationSchema: validateChangePasswordForm,
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  React.useEffect(() => {
    if (response?.status_code === 200) {
      changePasswordFormik.setValues(changePasswordInitValues);
    }
  }, [response]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {t("member.change_password.title")}</title>
        <meta name="description" content="Change Password Page" />
        <meta name="og:title" content="Change Password" />
      </Helmet>
      <form
        className="change-password-form"
        onSubmit={changePasswordFormik.handleSubmit}
      >
        <div className="row">
          <div className="form-group">
            <label htmlFor="current_password">
              {t("member.change_password.field_old_password")} *
            </label>
            <input
              type={!showCurrentPassword ? "password" : "text"}
              className="form-control-auth"
              id="current_password"
              name="current_password"
              value={changePasswordFormik.values.current_password}
              onChange={changePasswordFormik.handleChange}
            />
            <div
              className="show-pass"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <FontAwesomeIcon
                icon={!showCurrentPassword ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
            <RenderFormikErrorMessage
              formikInstance={changePasswordFormik}
              field="current_password"
            />
            <RenderApiErrorMessage
              response={response}
              field="current_password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              {t("member.change_password.field_new_password")} *
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              className="form-control-auth"
              id="password"
              name="password"
              value={changePasswordFormik.values.password}
              onChange={changePasswordFormik.handleChange}
            />
            <div
              className="show-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={!showPassword ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
            <RenderFormikErrorMessage
              formikInstance={changePasswordFormik}
              field="password"
            />
            <RenderApiErrorMessage response={response} field="password" />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">
              {t("member.change_password.field_confirm_password")} *
            </label>
            <input
              type={!showConfirmPassword ? "password" : "text"}
              className="form-control-auth"
              id="password_confirmation"
              name="password_confirmation"
              value={changePasswordFormik.values.password_confirmation}
              onChange={changePasswordFormik.handleChange}
            />
            <div
              className="show-pass"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon
                icon={!showConfirmPassword ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
            <RenderFormikErrorMessage
              formikInstance={changePasswordFormik}
              field="password_confirmation"
            />
            <RenderApiErrorMessage
              response={response}
              field="password_confirmation"
            />
          </div>
        </div>
        <button className="btn btn-primary d-block ml-auto" type="submit">
          {t("member.user_profile.btn_save")}
        </button>
      </form>
    </>
  );
};
