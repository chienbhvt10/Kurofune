import React from "react";
import { Link } from "react-router-dom";
import { InputIcon } from "../../../commons/InputIcon";
import "./style.scss";
export const Login = () => {
  return (
    <>
      <h4 className="title">
        一般社団法人在日外国人就業者支援協会
        <br />
        生活支援ポータルサイト
      </h4>
      <InputIcon
        label="メールアドレス"
        name="UserName"
        type="email"
        icon="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
      />
      <InputIcon
        label="パスワード"
        name="Password"
        type="password"
        icon="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
      />
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
      <div className="d-flex justify-content-center note">
        <a className="mr-2" data-toggle="modal" data-target="#term-of-use">
          利用規約
        </a>
        <a data-toggle="modal" data-target="#privacy-policy">
          プライバシーポリシー
        </a>
      </div>
      <div
        class="modal fade"
        id="privacy-policy"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary  d-block m-auto">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="term-of-use"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary d-block m-auto">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
