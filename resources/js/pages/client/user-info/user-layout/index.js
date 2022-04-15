import { faBackward, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconBack from "../../../../../sass/image/icon-back.png";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
export const UserLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-layout-container">
        <div className="user-layout-back">
          <Link to={"."} className="d-flex">
            <img className="icon-back" src={iconBack} alt="" />
            <span className="ml-2">総合トップページへ戻る</span>
          </Link>
        </div>
        <div className="user-layout-tabs">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                ユーザー情報
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                パスワード情報
              </a>
            </li>
          </ul>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
