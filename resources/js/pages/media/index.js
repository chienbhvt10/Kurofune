import {
  faSignOutAlt,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import "./media.scss";

const MediaPage = () => {
  return (
    <>
      <div id="media-page">
        <div className="content">
          <div className="page-header-content">
            <div className="box-text">
              <h4 className="heading">
                HIỆP HỘI HỖ TRỢ NGƯỜI LAO ĐỘNG NƯỚC NGOÀI TẠI NHẬT BẢN
                <br />
                CỔNG HỖ TRỢ{" "}
              </h4>
            </div>
          </div>
          <div className="service_dashboard">
            <div className="board-container">
              <div className="board-item">
                <Link
                  // target="_blank"
                  to="member"
                  className="item"
                  title="member services"
                >
                  <div className="icon">
                    <img src="images/media/pharma.png" alt="" />
                  </div>
                  <div className="desc">
                    <h3 className="tit">Hiệu thuốc Online </h3>
                  </div>
                </Link>
              </div>
              <div className="board-item block-disabled">
                <Link
                  target="_blank"
                  to="service-24h"
                  className="item"
                  title="service-24h"
                >
                  <div className="icon">
                    <img src="images/media/g_support.png" alt="" />
                  </div>
                  <div className="desc">
                    <h3 className="tit">Dịch vụ tư vấn 24 giờ</h3>
                  </div>
                </Link>
              </div>
              <div className="board-item">
                <a
                  target="_blank"
                  href="https://www.payforex.net/smypay/sloginregister.aspx?cd=4TW4BQ0TPWXS&amp;lang=vi-vn"
                  className="item"
                  title=""
                >
                  <div className="icon">
                    <img src="images/media/db.png" alt="" />
                  </div>
                  <div className="desc">
                    <h3 className="tit">Chuyển tiền ra nước ngoài</h3>
                  </div>
                </a>
              </div>
              <div className="board-item">
                <a
                  target="_blank"
                  href="https://kg-japaneseschool.jp/login"
                  className="item"
                  title="e-learning"
                >
                  <div className="icon">
                    <img src="images/media/edu.png" alt="" />
                  </div>
                  <div className="desc">
                    <h3 className="tit">Học trực tuyến</h3>
                  </div>
                </a>
              </div>
              <div className="board-item">
                <a
                  target="_blank"
                  href="https://wabisabi.media/vietnam/income-insurance/"
                  className="item"
                  title=""
                >
                  <div className="icon">
                    <img src="images/media/heat.png" alt="" />
                  </div>
                  <div className="desc">
                    <h3 className="tit">Bảo hiểm thu nhập</h3>
                  </div>
                </a>
              </div>
              <div className="board-item">
                <a
                  target="_blank"
                  href="https://wabisabi.media/vietnam/"
                  className="item"
                  title="wabisabi"
                >
                  <div className="icon">
                    <img
                      src="https://member.wabisabi.media/wp-content/themes/pharmacy/assets/imgs/wasabi-logo.svg"
                      alt=""
                    />
                  </div>
                  <div className="desc">
                    <h3 className="tit">WABISABI-MEDIA</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="switch">
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
                        href="https://member.wabisabi.media/"
                      >
                        Japanese - 日本語
                      </a>
                    </li>
                    <li className="lang-item lang-item-36 lang-item-en">
                      <a
                        lang="en-GB"
                        hrefLang="en-GB"
                        href="https://member.wabisabi.media/en/"
                      >
                        English - 英語
                      </a>
                    </li>
                    <li className="lang-item lang-item-67 lang-item-vi current-lang">
                      <a
                        lang="vi"
                        hrefLang="vi"
                        href="https://member.wabisabi.media/vi/"
                      >
                        Tiếng Việt - ベトナム語
                      </a>
                    </li>
                    <li className="lang-item lang-item-165 lang-item-tl">
                      <a
                        lang="tl"
                        hrefLang="tl"
                        href="https://member.wabisabi.media/tl/"
                      >
                        Tagalog - タガログ語
                      </a>
                    </li>
                    <li className="lang-item lang-item-198 lang-item-zh">
                      <a
                        lang="zh-CN"
                        hrefLang="zh-CN"
                        href="https://member.wabisabi.media/zh/"
                      >
                        中文 - 中国語
                      </a>
                    </li>
                    <li>
                      <button id="close-lang">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faTimes}
                          size="md"
                        />

                        <span className="">Đóng</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="option">
                <div className="settings-wrap">
                  <a
                    href="https://member.wabisabi.media/vi/member/change-profile"
                    title=""
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUserGear}
                      size="md"
                    />
                    <span>Thông tin người dùng </span>
                  </a>
                </div>
                <div className="logout-wrap pc">
                  <a
                    href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=bb23afb59e"
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
            <div className="switch-lang sp">
              <div className="logout-wrap">
                <a
                  href="https://member.wabisabi.media/wp-login.php?action=logout&amp;_wpnonce=bb23afb59e"
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
      <Footer />
    </>
  );
};

export default MediaPage;
