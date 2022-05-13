import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../redux/actions/authAction";
import RenderFormikErrorMessage from "../../../commons/RenderErrorMessage/RenderFormikErrorMessage";
import RenderApiErrorMessage from "../../../commons/RenderErrorMessage/RenderApiErrorMessage";
import "./reset-password.scss";

const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageErrors = useSelector((state) => state.authState.errorMessages);
  let resetEmail = localStorage.getItem("forgot-email");

  console.log("reset message error", messageErrors);

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
      dispatch(resetPassword(values));
      if(messageErrors.status_code === 200){
        navigate("/login");
      }
    },
  });

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
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            style={{ textTransform: "lowercase" }}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <RenderFormikErrorMessage formikInstance={formik} field="password" />
          <RenderApiErrorMessage errorMessage={messageErrors} field="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm password</label>
          <input
            type="password"
            className="form-control"
            name="password_confirmation"
            id="password_confirmation"
            style={{ textTransform: "lowercase" }}
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
          />
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
