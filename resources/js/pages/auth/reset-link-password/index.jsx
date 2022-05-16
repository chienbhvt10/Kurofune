import React from "react";
import { Link } from "react-router-dom";
import "./reset-link-password.scss";

const ResetLinkPassword = () => {
  const lang = localStorage.getItem("lang");

  const backLogin = () => {
    localStorage.removeItem("forgot-email");
  };

  return (
    <div id="reset-link-password">
      <h4>Password reset email has been sent.</h4>
      <p>
        The password reissue email has been sent.
        <br />
        Please check your registered email address.
      </p>
      <div className="form-group d-few text-center">
        <Link className="btn btn-back" to={`${lang}/member/login`} onClick={backLogin}>
          BACK
        </Link>
      </div>
    </div>
  );
};

export default ResetLinkPassword;
