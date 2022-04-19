import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const [showPass, setPass] = useState(true);
  const [showConfirmPass, setConfirmPass] = useState(true);
  const { i18n, t } = useTranslation();
  return (
    <div className="register-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('register.title')}</title>
        <meta name="description" content="Register Page" />
        <meta name="og:title" content="Register" />
      </Helmet>
      <div className="header-register">
        <h4 className="title">{t('register.title')}</h4>
        <p>{t('register.description')}</p>
      </div>
      <form id="registerForm">
        <div className="row">
          <div className="form-group  col-sm-6">
            <label htmlFor="firstName">{t('register.field_first_name')}</label>
            <input type="email" className="form-control-auth" id="firstName" />
          </div>
          <div className="form-group  col-sm-6">
            <label htmlFor="lastName">{t('register.field_last_name')}</label>
            <input type="email" className="form-control-auth" id="lastName" />
          </div>
          <div className="form-group">
            <label htmlFor="UserName">{t('register.field_user_name')}</label>
            <input type="email" className="form-control-auth" id="UserName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('register.field_email')}</label>
            <input type="email" className="form-control-auth" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="Password">{t('register.field_password')}</label>
            <input
              type={showPass ? "password" : "text"}
              className="form-control-auth"
              id="Password"
            />
            <div className="show-pass" onClick={() => setPass(!showPass)}>
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">{t('register.field_confirm_password')}</label>
            <input
              type={showConfirmPass ? "password" : "text"}
              className="form-control-auth"
              id="confirmPassword"
            />
            <div
              className="show-pass"
              onClick={() => setConfirmPass(!showConfirmPass)}
            >
              <FontAwesomeIcon
                icon={showConfirmPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="check-info">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> {t('register.check_member_confirm')}</label>
          </div>
        </div>
        <div className="check-info">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> {t('register.check_vendor_register_confirm')}</label>
          </div>
        </div>
        <button className="btn btn-primary d-block m-auto">{t('register.btn_sign_up')}</button>
      </form>

      <div className="d-flex justify-content-center note">
        <Link to="/login">{t('register.btn_redirect_login')}</Link>
      </div>
    </div>
  );
};
