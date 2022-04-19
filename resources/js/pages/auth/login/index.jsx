import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Languages } from "../../../commons/Languges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PageHead from "../../../commons/PageHead";
import { useTranslation } from "react-i18next";
import ModalPolicy from "../../../components/Modal/ModalPolicy";
import ModalTerm from "../../../components/Modal/ModalTerm";
export const Login = () => {
  const [show, setShow] = useState(true);
  const { i18n, t } = useTranslation();
  function createMarkup() {
    return { __html: t("login.title") };
  }
  return (
    <>
      <PageHead content="Login" title="Login" />
      <h4 className="title" dangerouslySetInnerHTML={createMarkup()}></h4>
      <form id="loginForm">
        <div className="form-group">
          <label htmlFor="UserName">{t("login.email")}</label>
          <input type="email" className="form-control-auth" id="UserName" />
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
            id="Password"
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
            to="member/lostpassword"
            className="text-decoration-none text-forgot"
          >
            {t("login.forgetPassword")}
          </Link>
        </div>
        <button className="btn btn-primary d-block m-auto">
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
