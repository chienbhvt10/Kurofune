import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  Link
} from "react-router-dom";
import "./style.scss";
export const Languages = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  };
  const langUrl = window.location.pathname.slice(0, 4)
  if(langUrl === '/vi/' || langUrl === '/tl/' || langUrl === '/en/' || langUrl === '/zh/'){
    localStorage.setItem('lang', window.location.pathname.slice(0, 3));
    console.log(location.pathname)
    var pathName = location.pathname.slice(3)
  }else{
    localStorage.setItem('lang', '');
    var pathName = location.pathname
  }
  return (
    <>
      <div class="dropdown">
        <button
          className="dropdown-toggle d-block m-auto"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
         { t('login.languages') }
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link className="dropdown-item" to={`${pathName}`} onClick={() => changeLanguage("ja")}>
            Japanese - 日本語
          </Link>
          <Link className="dropdown-item" to={`/en${pathName}`} onClick={() => changeLanguage("en")}>
            English - 英語
          </Link>
          <Link className="dropdown-item" to={`/vi${pathName}`} onClick={() => changeLanguage("vi")}>
            Tiếng Việt - ベトナム語
          </Link>
          <Link className="dropdown-item" to={`/tl${pathName}`} onClick={() => changeLanguage("tl")}>
            Tagalog - タガログ語
          </Link>
          <Link className="dropdown-item" to={`/zh${pathName}`} onClick={() => changeLanguage("zh")}>
            中文 - 中国語
          </Link>
          <Link className="dropdown-item" to={`/zh${pathName}`} onClick={() => changeLanguage("zh")}>
            <FontAwesomeIcon className="icon mr-2" icon={faTimes} size="sm" />
              閉じる
          </Link>
        </div>
      </div>
    </>
  );
};
