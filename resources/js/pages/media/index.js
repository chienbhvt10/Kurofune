import {
  faSignOutAlt,
  faTimes,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mediaBoardItemData } from "../../commons/data";
import Board from "../../components/Board";
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
            <Board boardItems={mediaBoardItemData} />
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
