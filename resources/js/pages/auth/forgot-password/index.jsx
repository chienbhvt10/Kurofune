import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import RenderFormikErrorMessage from "../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import RenderApiErrorMessage from "../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import useForgotPassword from "../../../hooks/auth/useForgotPassword";
import "./forgot-password.scss";

const forgotEmailInitValues = {
  email: "",
};

const validateForgotEmail = Yup.object().shape({
  email: Yup.string(),
});

const ForgotPassword = () => {
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  let { response, getForgotPassword, resetResponse } = useForgotPassword();

  const formik = useFormik({
    initialValues: forgotEmailInitValues,
    validationSchema: validateForgotEmail,
    onSubmit: (values) => {
      getForgotPassword(values.email);
    },
  });

  const backLogin = () => {
    resetResponse();
  }

  useEffect(() => {
    if (!response || response?.status_code !== 200) {
      return;
    } else {
      navigate(`${lang}/reset-link-password`);
      backLogin();
    }
  }, [response]);

  return (
    <div id="forgot-password-page">
      <form className="forgot-password-form" onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="box-text">
            <p>
              Lost your password? Please enter your email address.
              <br />
              You will receive a link to create a new password via email.
            </p>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="email" className="pd-left">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                style={{ textTransform: "lowercase" }}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <img
                className="icon-input"
                src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
                alt=""
              />
              <div>
                <RenderFormikErrorMessage
                  formikInstance={formik}
                  field="email"
                />
                <RenderApiErrorMessage response={response} field="email" />
              </div>
            </div>
            <div className="form-group d-few text-center">
              <button type="submit" className="btn btn-primary w-auto">
                RESET PASSWORD{" "}
              </button>
            </div>
            <div className="form-group d-few text-center">
              <Link className="btn btn-back" to={`${lang}/login`} onClick={backLogin}>
                BACK
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
