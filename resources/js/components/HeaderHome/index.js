import {
  faBars,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
// import LanguageSwitcher from "../../commons/LanguageSwitcher";
import { Languages } from "../../commons/Languges";
import "./header-home.scss";
import { useTranslation } from 'react-i18next';
const HeaderHome = ({ toggleSideBar }) => {
  return (
    <div id="header-home">
      <div className="container-fluid">
        <div className="site-header ">
          <button
            className="navbar-toggler d-lg-none"
            id="touch-menu"
            type="button"
            data-target="#navbar-main"
            onClick={toggleSideBar}
          >
            <FontAwesomeIcon icon={faBars} size={"lg"} color="#58918B" />
          </button>
          <div className="block-profile-header ">
            <div className="shopping-cart">
              <div className="icon-cart">
                <Link id="cart-custom" to="cart" title="Xem giỏ hàng của bạn ">
                  <img className="icon" src="/images/icon-card.png" />
                </Link>
              </div>
              <div className="mini-cart">
                <div className="basket-block">
                  <div className="cart_block_list">
                    {/* <p className="woocommerce-mini-cart__empty-message">
                      Không có thông tin trong giỏ hàng.
                    </p> */}
                  </div>
                </div>
                <div id="loading" style={{ display: "none" }}>
                  <div className="loader"></div>
                </div>
              </div>
            </div>

            <div className="language-switcher language-switcher-dropdown">
            <Languages />

            </div>

            <div className="logout-wrap">
              <a
                href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=1750a2467b"
                title="Thoát"
              >
                Thoát{" "}
                <FontAwesomeIcon
                  className="icon"
                  icon={faSignOutAlt}
                  size="sm"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
