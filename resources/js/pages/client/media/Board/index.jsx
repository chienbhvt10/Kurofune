import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import "./board.scss";
import { LANG_VIETNAMESE } from "../../../../constants/languages";
import { ROLE_FULL_SUPPORT_PLAN2 } from "../../../../constants";
const Board = ({ boardItems, setModalVisible,role }) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const arrayScreenRequest = ['member','service']

  const checkRoleRequest = React.useCallback((nameRouter,disable)=>{
    let isRequest = arrayScreenRequest.includes(nameRouter)
    if(disable) return false
    if(!isRequest && role !== ROLE_FULL_SUPPORT_PLAN2) {
      return false
    }
    return true
  },[role])
  return (
    <div className="board-container">
      {boardItems.map((item, index) => {
        return (
          <div
            key={index}
            className={
              item.disable && lang !== `/${LANG_VIETNAMESE}`
                ? "board-item block-disabled"
                : "board-item"
            }
            onClick={() => {
              if (!checkRoleRequest(item.name,item.disable)) {
                setModalVisible((pre) => {
                  return !pre
                })
              } 
            }
            }
          >
            {item.type === "a_tag" ? (
              <a
                target={!checkRoleRequest(item.name,item.disable) ? '_blank' : ''}
                href={!checkRoleRequest(item.name,item.disable) ? null : item.link}
                className="item"
                title={item.link}
                // disabled={}
              >
                <div className="icon">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="desc">
                  <h3 className="tit">{t(item.title)}</h3>

                </div>
              </a>
            ) : (
              <Link to={checkRoleRequest(item.name,item.disable) ? `${lang}${item.link}` : ''  } className="item" title={item.link}>
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
