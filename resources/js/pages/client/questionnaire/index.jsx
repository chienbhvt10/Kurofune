import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";
export const Questionnaire = () => {
  const { i18n, t } = useTranslation();
  const [number, setNumber] = useState(5);
  const lang = localStorage.getItem("lang");
  useEffect(() => {
    (function () {
      const sc = document.querySelectorAll("script");
      let activeChat = false;
      sc.forEach((el) => {
        console.log(
          el.attributes.src?.nodeValue ==
            "https://front.ebot.chat/embed/js/webInit.js"
        );
        if (
          el.attributes.src?.nodeValue ==
          "https://front.ebot.chat/embed/js/webInit.js"
        ) {
          activeChat = true;
        }
      });
      if (!activeChat) {
        console.log("activeChat", activeChat);
        const webJs = document.createElement("script");
        webJs.type = "text/javascript";
        webJs.async = true;
        webJs.src = "https://front.ebot.chat/embed/js/webInit.js";
        webJs.onload = function () {
          webInit("61792ae247e39e694a190fa6");
        };
        const chatbot = document.getElementsByTagName("script")[0];
        chatbot.parentNode.insertBefore(webJs, chatbot);
      } else {
        const webChat = document.getElementsByClassName("wc-webchat-ctn")[0];
        webChat.style.display = "block";
      }
    })();
    return () => {
      const sc = document.getElementsByTagName("script")[0];
      const webChat = document.getElementsByClassName("wc-webchat-ctn")[0];
      webChat.style.display = "none";
    };
  }, []);
  return (
    <div className="questionnaire-container">
      <input type="hidden" id="sys_userid" value="1" />
      <div className="card">
        <div className="search-wrap">
          <div className="input-group">
            <FontAwesomeIcon
              icon={faSearch}
              size="sm"
              className="icon-search"
            />
            <input type="text" placeholder={t("questionnaire.placeholder")} />
          </div>
          <button className="btn-search">
            {t("questionnaire.btn_search")}
          </button>
        </div>
        <div className="product-container">
          <p className="show-number-result">
            {t("questionnaire.title_number_results")} {number}
            {t("questionnaire.description_number")}
          </p>
          <div className="product-list">
            <div className="product-item">
              <Link to={`${lang}/product-detail`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`${lang}/product-detail`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`${lang}/product-detail`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
            <div className="product-item">
              <Link to={`${lang}/product-detail`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`${lang}/product-detail`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`${lang}/product-detail`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
            <div className="product-item">
              <Link to={`${lang}/product-detail`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`${lang}/product-detail`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`${lang}/product-detail`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
