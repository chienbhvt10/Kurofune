import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import RenderFormikErrorMessage from "../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import RenderApiErrorMessage from "../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./reset-password.scss";

const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);

  const navigate = useNavigate();
  let { response, getResetPassword, resetResponse } = useResetPassword();

  const lang = localStorage.getItem("lang");
  let resetEmail = localStorage.getItem("forgot-email");



  const resetPasswordInitValues = {
    token: param.get("token"),
    email: resetEmail,
    password: "",
    password_confirmation: "",
  };

  const validateResetPassword = Yup.object().shape({
    token: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    password_confirmation: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: resetPasswordInitValues,
    validationSchema: validateResetPassword,
    onSubmit: (values) => {
      getResetPassword(values);
    },
  });

  useEffect(() => {
    if (!response || response?.status_code !== 200) {
      return;
    } else {
      navigate(`${lang}/member/login`);
      resetResponse();
    }
  }, [response]);

  return (
    <div id="reset-password">
      <form className="reset-password-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            disabled
            className="form-control"
            name="email"
            id="email"
            style={{ textTransform: "lowercase" }}
            defaultValue={formik.values.email}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
            alt=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "password" : "text"}
            className="form-control"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
            alt=""
          />
          <div
            className="show-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              color="#515151"
              size="sm"
            />
          </div>
          <RenderFormikErrorMessage formikInstance={formik} field="password" />
          <RenderApiErrorMessage response={response} field="password" />
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm password</label>
          <input
            type={showPasswordConfirm ? "password" : "text"}
            className="form-control"
            name="password_confirmation"
            id="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
            alt=""
          />
          <div
            className="show-pass"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          >
            <FontAwesomeIcon
              icon={showPasswordConfirm ? faEyeSlash : faEye}
              color="#515151"
              size="sm"
            />
          </div>
        </div>
        <div className="form-group">
          <input
            name="token"
            type="hidden"
            defaultValue={formik.values.token}
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
