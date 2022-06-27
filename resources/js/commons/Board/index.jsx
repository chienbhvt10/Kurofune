import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./board.scss";
import { getCurrentLanguage } from "../../helper/localStorage";
import { LANG_VIETNAMESE } from "../../constants";
const Board = ({ boardItems, setModalVisible }) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const arrayScreenRequest = ['member', 'service']
  return (
    <div className="board-container">
      {boardItems.map((item, index) => {
        let isRequest = arrayScreenRequest.includes(item.name)
        return (
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
                  return !pre
                })
              }
              // if (!isRequest) {
              //   // setModalVisible((pre) => {
              //   //   return !pre
              //   // })
              // }
            }
            }
          >
            {item.type === "a_tag" ? (
              <a
                target={!isRequest ?'' : '_blank'}
                href={(!item.disable && isRequest) ? item.link : null}
                className="item"
                title={item.link}
                disabled={!isRequest}
              >
                <div className="icon">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="desc">
                  <h3 className="tit">{t(item.title)}</h3>

                </div>
              </a>
            ) : (
              <Link to={(!item.disable && isRequest) ? `${lang}${item.link}` : ''} className="item" title={item.link}>
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
        )
      })}
    </div>
  );
};

export default Board;
