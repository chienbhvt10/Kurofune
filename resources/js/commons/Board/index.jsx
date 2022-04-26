import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./board.scss";
const Board = ({ boardItems }) => {
  const { i18n, t } = useTranslation();
  let lang = localStorage.getItem("lang");
  return (
    <div className="board-container">
      {boardItems.map((item, index) => (
        <div
          key={index}
          className={item.disable && lang !=='/vi'  ? "board-item block-disabled" : "board-item"}
        >
          {item.type === "a_tag" ? (
            <a
              target="_blank"
              href={item.link}
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
            <Link
              to={`${lang}${item.link}`}
              className="item"
              title={item.link}
            >
              <div className="icon">
                <img src={index === 1 && lang === '/vi'  ?"https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/support.png" : item.imageUrl} alt="" />
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
