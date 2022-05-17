import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Languages } from "../../../commons/Languges";
import PageHead from "../../../commons/PageHead";
import ModalPolicy from "../../../components/Modal/ModalPolicy";
import ModalTerm from "../../../components/Modal/ModalTerm";
import useLogin from "../../../hooks/auth/useLogin";
import "./style.scss";

const credential = Yup.object().shape({});
export const Login = () => {
  const [show, setShow] = useState(true);
  const user = useSelector((state) => state.authState.userInfo);
  const token = useSelector((state) => state.authState.token);
  const { i18n, t } = useTranslation();
  const lang = localStorage.getItem('lang');
  const { loginUser } = useLogin();
  function createMarkup() {
    return { __html: t("login.title") };
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: credential,
    onSubmit: (values) => {
      loginUser(values);
    },
  });
  return (
    <>
      <PageHead content="Login" title="Login" />
      <h4 className="title" dangerouslySetInnerHTML={createMarkup()}></h4>
      <form id="loginForm" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="UserName">{t("login.email")}</label>
          <input
            type="email"
            name="email"
            className="form-control-auth"
            id="UserName"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
            alt=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">{t("login.password")}</label>
          <input
            type={show ? "password" : "text"}
            className="form-control-auth"
            name="password"
            id="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
            alt=""
          />
          <div className="show-pass" onClick={() => setShow(!show)}>
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              color="#515151"
              size="sm"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between remember-block">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> {t("login.remember")}</label>
          </div>
          <Link
            to={`${lang}/member/forgot-password`}
            className="text-decoration-none text-forgot"
          >
            {t("login.forgetPassword")}
          </Link>
        </div>
        <button className="btn btn-primary d-block m-auto" type="submit">
          {t("login.login_btn")}
        </button>
      </form>

      <div className="d-flex justify-content-center note">
        <ModalTerm text={t("login.term_of_use")} />
        <ModalPolicy text={t("login.privacy_policy")} />
      </div>
      <div className="dropdown-language-menu">
        <Languages />
        <span className="footer-text">{t("login.kurofune")} 2022</span>
      </div>
    </>
  );
};
