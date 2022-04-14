import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.scss";
import { Languages } from "../../../commons/Languges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
export const Register = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name="description" content="Register Page" />
        <meta name="og:title" content="Register" />
      </Helmet>
      <h4 className="title">組織名</h4>
      <form id="registerForm">
        <div className="row">
          <div class="form-group  col-sm-6">
            <label htmlFor="UserName">メールアドレス</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group  col-sm-6">
            <label htmlFor="UserName">メールアドレス</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="UserName">メールアドレス</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="UserName">メールアドレス</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="Password">パスワード</label>
            <input
              type={show ? "password" : "text"}
              className="form-control-auth"
              id="Password"
            />
            <div className="show-pass" onClick={() => setShow(!show)}>
              <FontAwesomeIcon
                icon={show ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="Password">パスワード</label>
            <input
              type={show ? "password" : "text"}
              className="form-control-auth"
              id="Password"
            />
            <div className="show-pass" onClick={() => setShow(!show)}>
              <FontAwesomeIcon
                icon={show ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between remember-block">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1"> 保存する</label>
          </div>
          <Link
            to="member/lostpassword"
            className="text-decoration-none text-forgot"
          >
            パスワードを忘れた方はこちら
          </Link>
        </div>
        <button className="btn btn-primary d-block m-auto">ログイン </button>
      </form>

      <div className="d-flex justify-content-center note">
        <a className="mr-2" data-toggle="modal" data-target="#term-of-use">
          利用規約
        </a>
        <a data-toggle="modal" data-target="#privacy-policy">
          プライバシーポリシー
        </a>
      </div>
      <div className="dropdown-language-menu">
        <Languages />
        <span className="footer-text">©KUROFUNE 2022</span>
      </div>
    </>
  );
};
