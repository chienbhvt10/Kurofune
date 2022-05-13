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
  let lang = localStorage.getItem("lang");
  const { i18n, t } = useTranslation();
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
            currentPath={`${lang}/product-detail`}
            backTo={`${lang}/medicine-list`}
            title={t("header.btn_back1")}
          />
          <BackButton
            currentPath={`${lang}/member/order-detail`}
            backTo={`${lang}/member/order-history`}
            title={t("header.btn_back2")}
          />
          <BackButton
            currentPath={`${lang}/checkout`}
            backTo={`${lang}/cart`}
            title={t("header.btn_back3")}
          />
          <div className="block-profile-header ">
            <div className="shopping-cart">
              <div className="icon-cart">
                <Link
                  id="cart-custom"
                  to={`${lang}/cart`}
                  title={t("header.cart_title")}
                >
                  <img className="icon" src="/images/icon-card.png" />
                  <span className="quantity">1</span>
                </Link>
              </div>
              <div className="mini-cart">
                <div className="basket-block">
                  <div className="cart_block_list">
                    <p className="d-none">{t("header.cart_empty")}</p>
                    <div className="group">
                      <p className="buttons">
                        <Link
                          to={`/${lang}/cart`}
                          className="button wc-forward"
                        >
                          {t("header.btn_view_cart")}
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
                          <Link to={`/${lang}/product-detail`}>
                            <img
                              alt="image-prod-Medicine list"
                              src="/images/medicine-list/14_hcg-stick.jpeg"
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
                          to={`/${lang}/checkout`}
                          className="button checkout wc-forward"
                        >
                          {t("header.btn_buy")}
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
              <Link to="/login" title={t("header.btn_logout")}>
                {t("header.btn_logout")}
                <FontAwesomeIcon
                  className="icon"
                  icon={faSignOutAlt}
                  size="sm"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
