import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../redux/actions/authAction";
import "./forgot-password.scss";

const forgotEmailInitValues = {
  email: "",
};

const validate = values => {
  const errors = {};
  if(!values.email){
    errors.email = 'Required';
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  console.log("errors", errors);
}

const ForgotPassword = () => {
  let lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: forgotEmailInitValues,
    onSubmit: (values) => {
      if (validate(values)) {
        dispatch(forgotPassword(values.email));
        navigate(`${lang}/reset-link-password`);
      }
    },
  });

  return (
    <div id="forgot-password-page">
      <form className="forgot-password-form" onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="box-text">
            <p>
              Bạn quên mật khẩu đúng không?
              <br />
              Hãy điền địa chỉ email, chúng tôi sẽ gửi một đường dẫn cài đặt lại
              mật khẩu mới.
            </p>
          </div>
          <div className="">
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
                value={formik.values.forgotEmail}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email === 'Required' ? (<div>{formik.errors.email}</div>) : null}
              <img
                src="https://member.wabisabi.media/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
                alt=""
                className="icon"
              />
            </div>
            <div className="form-group d-few text-center">
              <button type="submit" className="btn btn-primary w-auto">
                GỬI EMAIL{" "}
              </button>
            </div>
            <div className="form-group d-few text-center">
              <Link className="btn btn-back" to="/login">
                Trở lại
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
