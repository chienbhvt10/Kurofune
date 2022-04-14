import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./language-switcher.scss";
const LanguageSwitcher = () => {
  return (
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
            <Link lang="ja" hrefLang="ja" to="member">
              Japanese - 日本語
            </Link>
          </li>
          <li className="lang-item lang-item-36 lang-item-en">
            <Link lang="en-GB" hrefLang="en-GB" to="en/member">
              English - 英語
            </Link>
          </li>
          <li className="lang-item lang-item-67 lang-item-vi current-lang">
            <Link lang="vi" hrefLang="vi" to="vi/member">
              Tiếng Việt - ベトナム語
            </Link>
          </li>
          <li className="lang-item lang-item-165 lang-item-tl">
            <Link lang="tl" hrefLang="tl" to="tl/member">
              Tagalog - タガログ語
            </Link>
          </li>
          <li className="lang-item lang-item-198 lang-item-zh">
            <Link lang="zh-CN" hrefLang="zh-CN" to="zh/member">
              中文 - 中国語
            </Link>
          </li>
          <li>
            <button id="close-lang">
              <FontAwesomeIcon className="icon" icon={faTimes} size="sm" />
              <span className="ml-2">Đóng</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
