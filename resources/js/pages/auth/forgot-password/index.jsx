import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { forgotPassword } from "../../../redux/actions/authAction";
import "./forgot-password.scss";

const ForgotPassword = () => {
  let lang = localStorage.getItem("lang");
  const [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch();

  const handleChangeEmail = (e) => {
    setForgotEmail(e.target.value);
  };

  const handleResetPassword = () => {
    localStorage.setItem("save-email", forgotEmail);
    dispatch(forgotPassword(forgotEmail));
  }

  return (
    <div id="forgot-password-page">
      <form className="forgot-password-form">
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
              <label htmlFor="user_email" className="pd-left">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="user_email"
                id="user_email"
                value={forgotEmail}
                style={{ textTransform: "lowercase" }}
                onChange={(e) => handleChangeEmail(e)}
              />
              <img
                src="https://member.wabisabi.media/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
                alt=""
                className="icon"
              />
            </div>
            <div className="form-group d-few text-center">
              <Link
                to={`${lang}/reset-link-password`}
                className="btn btn-primary w-auto"
                onClick={() => handleResetPassword()}
                state={{forgotEmail}}
              >
                GỬI EMAIL{" "}
              </Link>
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
