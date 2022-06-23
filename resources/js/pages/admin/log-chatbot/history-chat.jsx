import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Image } from "antd";
export const HistoryChat = ({ data, langChat }) => {
  return (
    <>
      {data && (
        <div className="list-chat-container">
          {data.data_log.map((item, index) => (
            <div
              key={index}
              className={`chat-item__bot d-flex ${
                item.admin
                  ? " justify-content-start"
                  : "flex-row-reverse mr-auto"
              }`}
            >
              <div className="image-chat">
                <Image
                  src={
                    item.admin
                      ? "/images/bot-admin.png"
                      : (data.user_avatar||"/images/bot-user.png")
                  }
                  alt=""
                />
                <p>{item.admin ? "BOT" : data.user_name}</p>
              </div>
              <div className="content-chat">
                {!item.type ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item[langChat],
                    }}
                  />
                ) : item.type === "image" ? (
                  <Image style={{maxWidth:'100%'}} src={item.url_image} alt="" />
                ) : (
                  <a className="url_Chat" href={item.url} target="_blank">
                    {item[langChat]}
                  </a>
                )}
              </div>
              <div className="date-icon">
                <div className="date-chat">
                  {moment(item.time).format("YYYY/MM/DD")}
                </div>
                <div className="icon_checkCircle">
                  <FontAwesomeIcon
                    className="icon mr-2"
                    color="#9ec94a"
                    icon={faCheckCircle}
                    size="1x"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
