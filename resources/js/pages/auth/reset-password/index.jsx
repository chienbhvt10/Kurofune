import React from "react";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/actions/authAction";
import "./reset-password.scss";


const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let resetEmail = localStorage.getItem("save-email");

  console.log("resetEmail", resetEmail);

  const resetPasswordInitValue = {
    token: param.get("token"),
    email: resetEmail,
    password: "",
    password_confirmation: "",
  };

  const formik = useFormik({
    initialValues: resetPasswordInitValue,
    onSubmit: (values) => {
      if(values){
        console.log("values form", values);
        dispatch(resetPassword(values));
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
          <input name="token" type="hidden" defaultValue={formik.values.token} />
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
