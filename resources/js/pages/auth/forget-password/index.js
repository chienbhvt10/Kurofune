import React from "react";
import "./forget-password.scss";
const LostPassword = () => {
  return (
    <div id="lost-password-page">
      <form className="lost-password-form">
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
              <label for="user_email" className="pd-left">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="user_email"
                id="user_email"
                value=""
                style={{ textTransform: "lowercase" }}
              />
              <img
                src="https://member.wabisabi.media/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
                alt=""
                className="icon"
              />
            </div>
            <div className="form-group d-few text-center">
              <button
                type="submit"
                name="submit-action"
                className="btn btn-primary w-auto"
              >
                GỬI EMAIL{" "}
              </button>
            </div>
            <div className="form-group d-few text-center">
              <a className="btn btn-back" href="/login">
                Trở lại
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LostPassword;
