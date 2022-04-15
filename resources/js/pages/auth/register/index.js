import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
export const Register = () => {
  const [showPass, setPass] = useState(true);
  const [showConfirmPass, setConfirmPass] = useState(true);
  return (
    <div className="register-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name="description" content="Register Page" />
        <meta name="og:title" content="Register" />
      </Helmet>
      <div className="header-register">
        <h4 className="title">組織名</h4>
        <p>アカウントの作成を完了してください</p>
      </div>
      <form id="registerForm">
        <div className="row">
          <div class="form-group  col-sm-6">
            <label htmlFor="UserName">名</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group  col-sm-6">
            <label htmlFor="UserName">姓</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="UserName">ユーザーネーム</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="UserName">メールアドレス</label>
            <input type="email" class="form-control-auth" id="UserName" />
          </div>
          <div class="form-group">
            <label htmlFor="Password">パスワード</label>
            <input
              type={showPass? "password" : "text"}
              className="form-control-auth"
              id="Password"
            />
            <div className="show-pass" onClick={() => setPass(!showPass)}>
              <FontAwesomeIcon
                icon={showPass? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="Password">パスワード確認</label>
            <input
              type={showConfirmPass ? "password" : "text"}
              className="form-control-auth"
              id="Password"
            />
            <div className="show-pass" onClick={() => setConfirmPass(!showConfirmPass)}>
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
            <label for="vehicle1"> パスワード確認</label>
          </div>
        </div>
        <div className="check-info">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1"> ベンダーになる</label>
          </div>
        </div>
        <button className="btn btn-primary d-block m-auto">
          サインアップ
        </button>
      </form>

      <div className="d-flex justify-content-center note">
        <Link to="/login">
           すでにアカウントをお持ちですか？ログイン
        </Link>
      </div>
    </div>
  );
};
