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
            <Link className="nav-link" to="questionnaire">
              <img
                className="icon"
                src="images/sidebar/Questionnaire-form.png"
              />
              <span>Bảng câu hỏi chẩn đoán bệnh</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="list-of-pharmacies">
              <img className="icon" src="images/sidebar/list-pharmacies.png" />
              <span>Danh sách nhà thuốc</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="medicine-list">
              <img className="icon" src="images/sidebar/medicine-list.png" />
              <span>Danh sách thuốc</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="order-history">
              <img className="icon" src="images/sidebar/Order-history.png" />
              <span>Lịch sử mua hàng</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="cart">
              <img className="icon" src="images/sidebar/cart.png" />
              <span>Giỏ hàng</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="billing-address">
              <img className="icon" src="images/sidebar/Settings.png" />
              <span>Thông tin đăng kí</span>
            </Link>
          </li>
          <li className="menu-item ">
            <Link className="nav-link" to="media">
              <img className="icon" src="images/sidebar/home.png" />
              <span>Trang chủ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
