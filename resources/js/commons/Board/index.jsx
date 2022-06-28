import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./board.scss";
import { getCurrentLanguage } from "../../helper/localStorage";
import { LANG_VIETNAMESE } from "../../constants/languages";
const Board = ({ boardItems, setModalVisible }) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  return (
    <div className="board-container">
      {boardItems.map((item, index) => (
        <div
          key={index}
          className={
            item.disable && lang !== `/${LANG_VIETNAMESE}`
              ? "board-item block-disabled"
              : "board-item"
          }
          onClick={() => {
            if (item.disable) {
              setModalVisible((pre) => {
                return !pre;
              });
            }
          }}
        >
          {item.type === "a_tag" ? (
            <a
              target="_blank"
              href={!item.disable ? item.link : ""}
              className="item"
              title={item.link}
            >
              <div className="icon">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">{t(item.title)}</h3>
              </div>
            </a>
          ) : (
            <Link to={`${lang}${item.link}`} className="item" title={item.link}>
              <div className="icon">
                <img
                  src={
                    index === 1 && lang === `/${LANG_VIETNAMESE}`
                      ? "https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/support.png"
                      : item.imageUrl
                  }
                  alt=""
                />
              </div>
              <div className="desc">
                <h3 className="tit">{t(item.title)}</h3>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
