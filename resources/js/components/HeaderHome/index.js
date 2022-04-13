import {
  faBars,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./header-home.scss";
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
          <div className="block-profile-header dropdown">
            <div className="shopping-cart">
              <div className="icon-cart">
                <a
                  id="cart-custom"
                  href="https://member.wabisabi.media/vi/cart"
                  title="Xem giỏ hàng của bạn "
                >
                  <img className="icon" src="images/icon-card.png" />
                </a>
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
              <div className="switch-lang">
                <div className="btn-group" id="openItems">
                  <button
                    className="btn myLangClass dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span className="caption font-weight-bold">Languages</span>
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" id="openItemDropdown">
                    <li className="lang-item lang-item-38 lang-item-ja lang-item-first">
                      <a
                        lang="ja"
                        hrefLang="ja"
                        href="https://member.wabisabi.media/member"
                      >
                        Japanese - 日本語
                      </a>
                    </li>
                    <li className="lang-item lang-item-36 lang-item-en">
                      <a
                        lang="en-GB"
                        hrefLang="en-GB"
                        href="https://member.wabisabi.media/en/member"
                      >
                        English - 英語
                      </a>
                    </li>
                    <li className="lang-item lang-item-67 lang-item-vi current-lang">
                      <a
                        lang="vi"
                        hrefLang="vi"
                        href="https://member.wabisabi.media/vi/member"
                      >
                        Tiếng Việt - ベトナム語
                      </a>
                    </li>
                    <li className="lang-item lang-item-165 lang-item-tl">
                      <a
                        lang="tl"
                        hrefLang="tl"
                        href="https://member.wabisabi.media/tl/member"
                      >
                        Tagalog - タガログ語
                      </a>
                    </li>
                    <li className="lang-item lang-item-198 lang-item-zh">
                      <a
                        lang="zh-CN"
                        hrefLang="zh-CN"
                        href="https://member.wabisabi.media/zh/member"
                      >
                        中文 - 中国語
                      </a>
                    </li>
                    <li>
                      <button id="close-lang">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faTimes}
                          size="sm"
                        />
                        <span className="ml-2">Đóng</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
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
