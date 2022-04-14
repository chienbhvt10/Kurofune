import {
  faArrowCircleLeft,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./side-bar.scss";

const SideBar = ({ show, toggleSideBar }) => {
  return (
    <div id="side-bar" className={show ? "show" : ""}>
      <div className="task-bar-title">
        Hiệu thuốc Online
        <div className={show ? "btn_toggle show" : "btn_toggle"}>
          <FontAwesomeIcon
            onClick={toggleSideBar}
            icon={faArrowCircleLeft}
            color="#58918B"
            size="lg"
          />
        </div>
      </div>

      <div className="navbar-main-wrapper">
        <ul className="nav navbar-nav">
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/member/questionnaire"
            >
              <img
                className="icon"
                src="images/sidebar/Questionnaire-form.png"
              />
              <span>Bảng câu hỏi chẩn đoán bệnh</span>
            </a>
          </li>
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/list-of-pharmacies"
            >
              <img className="icon" src="images/sidebar/list-pharmacies.png" />
              <span>Danh sách nhà thuốc</span>
            </a>
          </li>
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/medicine-list"
            >
              <img className="icon" src="images/sidebar/medicine-list.png" />
              <span>Danh sách thuốc</span>
            </a>
          </li>
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/member/order-history"
            >
              <img className="icon" src="images/sidebar/Order-history.png" />
              <span>Lịch sử mua hàng</span>
            </a>
          </li>
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/cart"
            >
              <img className="icon" src="images/sidebar/cart.png" />
              <span>Giỏ hàng</span>
            </a>
          </li>
          <li className="menu-item ">
            <a
              className="nav-link"
              href="https://member.wabisabi.media/vi/member/billing-address"
            >
              <img className="icon" src="images/sidebar/Settings.png" />
              <span>Thông tin đăng kí</span>
            </a>
          </li>
          <li className="menu-item ">
            <a className="nav-link" href="https://member.wabisabi.media/vi">
              <img className="icon" src="images/sidebar/home.png" />
              <span>Trang chủ</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
