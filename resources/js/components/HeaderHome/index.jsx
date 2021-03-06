import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../../commons/BackButton";
import { Languages } from "../../commons/Languges";
import { getCurrentLanguage } from "../../helper/localStorage";
import "./header-home.scss";
import useLogout from "../../hooks/auth/useLogout";
import useCart from "../../hooks/cart/useCart";
import { useSelector } from "react-redux";
import { isAdmin, isVendor } from "../../helper/checker";
const HeaderHome = ({ toggleSideBar }) => {
  const userInfo = useSelector((state) => state.authState.userInfo);
  const roles = useSelector((state) => state.authState.profile?.roles);
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { getLogout } = useLogout();
  const [disabledCart, setDisabledCart] = React.useState("");
  const location = useLocation();
  const isShowCart = !(
    isAdmin(roles) ||
    isAdmin(userInfo?.roles?.name) ||
    isVendor(roles) ||
    isVendor(userInfo?.roles?.name)
  );
  const handleLogout = () => {
    getLogout();
  };
  const { cartInfo, deleteCartItem } = useCart();
  const totalQuantity = cartInfo?.cart_item
    ? cartInfo.cart_item.reduce(
        (prev, currentItem) => prev + currentItem.quantity,
        0
      )
    : 0;

      React.useEffect(() => {
        location.pathname === `${lang}/cart`
          ? setDisabledCart("disabled-cart")
          : setDisabledCart("");
      }, [location]);
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
            backTo={`${lang}/category-list`}
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
            {isShowCart && (
              <div className={`shopping-cart ${disabledCart}`}>
                <div className="icon-cart">
                  <Link
                    id="cart-custom"
                    to={`${lang}/cart`}
                    title={t("header.cart_title")}
                  >
                    <img className="icon" src="/images/icon-card.png" />
                    {Number(totalQuantity) > 0 && (
                      <span className="quantity">{totalQuantity}</span>
                    )}
                  </Link>
                </div>

                <div className="mini-cart">
                  <div className="basket-block">
                    <div className="cart_block_list">
                      {cartInfo?.cart_item.length > 0 ? (
                        <div className="group">
                          <p className="buttons">
                            <Link
                              to={`${lang}/cart`}
                              className="button wc-forward"
                            >
                              {t("header.btn_view_cart")}
                            </Link>{" "}
                          </p>

                          <ul className="cart_list product_list_widget ">
                            {cartInfo.cart_item.map((item) => (
                              <li className="mini_cart_item" key={item.id}>
                                <button
                                  className="remove remove_from_cart_button_cus"
                                  aria-label="X??a s???n ph???m n??y"
                                  data-product_id="851"
                                  data-item-key="92fb0c6d1758261f10d052e6e2c1123c"
                                  data-product_sku=""
                                  onClick={() => deleteCartItem(item.id)}
                                >
                                  ??
                                </button>{" "}
                                <span className="quantity">
                                  {item?.quantity} ??{" "}
                                  <span className="amount">
                                    <bdi>
                                      {new Intl.NumberFormat("en-US").format(item?.price_tax)} {!lang ? "???" : "(JPY)"}
                                    </bdi>
                                  </span>
                                </span>{" "}
                                <Link
                                  to={`${lang}/product-detail/${item?.product_id}`}
                                  className="item-img"
                                >
                                  <img
                                    alt="image-prod-Medicine list"
                                    src={item.product_image}
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <p className="total d-none">
                            <strong>T???ng s??? ph???:</strong>{" "}
                            <span className="">
                              <bdi>
                                878&nbsp;
                                <span className="">(JPY)</span>
                              </bdi>
                            </span>{" "}
                            <small className="tax_label">(Bao g???m thu???)</small>{" "}
                          </p>

                          <p className="buttons checkout-btn">
                            <Link
                              to={`${lang}/checkout`}
                              className="button checkout wc-forward"
                            >
                              {t("header.btn_buy")}
                            </Link>{" "}
                          </p>
                        </div>
                      ) : (
                        <p className="empty-cart-text">
                          {t("header.cart_empty")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="language-switcher language-switcher-dropdown">
              <Languages />
            </div>

            <div className="logout-wrap">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                title={t("header.btn_logout")}
              >
                {t("header.btn_logout")}
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
