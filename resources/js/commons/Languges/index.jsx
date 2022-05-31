import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../constants";
import { setCurrentLanguage } from "../../helper/localStorage";
import "./style.scss";
export const Languages = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // window.location.load();
  };
  const langUrl = window.location.pathname.slice(0, 4);
  if (
    langUrl === "/vi/" ||
    langUrl === "/tl/" ||
    langUrl === "/en/" ||
    langUrl === "/zh/"
  ) {
    setCurrentLanguage(window.location.pathname.slice(0, 3));
    var pathName = location.pathname.slice(3);
  } else {
    setCurrentLanguage("");
    var pathName = location.pathname;
  }
  return (
    <>
      <div className="dropdown">
        <button
          className="dropdown-toggle d-block m-auto"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {t("login.languages")}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link
            className="dropdown-item"
            to={`${pathName}`}
            onClick={() => changeLanguage(LANG_JAPANESE)}
          >
            Japanese - 日本語
          </Link>
          <Link
            className="dropdown-item"
            to={`/en${pathName}`}
            onClick={() => changeLanguage(LANG_ENGLISH)}
          >
            English - 英語
          </Link>
          <Link
            className="dropdown-item"
            to={`/vi${pathName}`}
            onClick={() => changeLanguage(LANG_VIETNAMESE)}
          >
            Tiếng Việt - ベトナム語
          </Link>
          <Link
            className="dropdown-item"
            to={`/tl${pathName}`}
            onClick={() => changeLanguage(LANG_PHILIPPINES)}
          >
            Tagalog - タガログ語
          </Link>
          <Link
            className="dropdown-item"
            to={`/zh${pathName}`}
            onClick={() => changeLanguage(LANG_CHINESE)}
          >
            中文 - 中国語
          </Link>
          <Link
            className="dropdown-item"
            to={`/zh${pathName}`}
            onClick={() => changeLanguage(LANG_CHINESE)}
          >
            <FontAwesomeIcon className="icon mr-2" icon={faTimes} size="sm" />
            閉じる
          </Link>
        </div>
      </div>
    </>
  );
};
