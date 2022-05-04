import {
  faBars,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../../commons/BackButton";
// import LanguageSwitcher from "../../commons/LanguageSwitcher";
import { Languages } from "../../commons/Languges";
import "./header-home.scss";
import { useTranslation } from "react-i18next";
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
          <BackButton
            currentPath="/product-detail"
            backTo="/medicine-list"
            title="Quay lại danh sách thuốc"
          />
          <BackButton
            currentPath="/member/order-detail"
            backTo="/member/order-history"
            title="Quay lại danh sách đặt hàng"
          />
          <BackButton
            currentPath="/checkout"
            backTo="/cart"
            title="Quay lại giỏ hàng"
          />
          <div className="block-profile-header ">
            <div className="shopping-cart">
              <div className="icon-cart">
                <Link id="cart-custom" to="cart" title="Xem giỏ hàng của bạn ">
                  <img className="icon" src="/images/icon-card.png" />
                  <span className="quantity">1</span>
                </Link>
              </div>
              <div className="mini-cart">
                <div className="basket-block">
                  <div className="cart_block_list">
                    <p className="d-none">Không có thông tin trong giỏ hàng.</p>
                    <div className="group">
                      <p className="buttons">
                        <Link to="/cart" className="button wc-forward">
                          Xem giỏ hàng
                        </Link>{" "}
                      </p>
                      <ul className="cart_list product_list_widget ">
                        <li className="mini_cart_item">
                          <Link
                            to="#"
                            className="remove remove_from_cart_button_cus"
                            aria-label="Xóa sản phẩm này"
                            data-product_id="851"
                            data-item-key="92fb0c6d1758261f10d052e6e2c1123c"
                            data-product_sku=""
                          >
                            ×
                          </Link>{" "}
                          <span className="quantity">
                            1 ×{" "}
                            <span className="amount">
                              <bdi>
                                878&nbsp;
                                <span className="">(JPY)</span>
                              </bdi>
                            </span>
                          </span>{" "}
                          <Link to="/product-detail">
                            <img
                              alt="image-prod-Medicine list"
                              src="https://member.wabisabi.media/wp-content/uploads/2022/02/14_hcg-stick.jpeg"
                            />
                          </Link>
                        </li>
                      </ul>
                      <p className="total d-none">
                        <strong>Tổng số phụ:</strong>{" "}
                        <span className="">
                          <bdi>
                            878&nbsp;
                            <span className="">(JPY)</span>
                          </bdi>
                        </span>{" "}
                        <small className="tax_label">(Bao gồm thuế)</small>{" "}
                      </p>

                      <p className="buttons checkout-btn">
                        <Link
                          to="/checkout"
                          className="button checkout wc-forward"
                        >
                          Mua
                        </Link>{" "}
                      </p>
                    </div>
                  </div>
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