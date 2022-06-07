import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
export const HistoryChat = ({ data, langChat }) => {
  console.log("====================================");
  console.log("History", data);
  console.log("====================================");
  return (
    <>
      {data && (
        <div className="list-chat-container">
          {data.data_log.map((item) => (
            <div
              className={`chat-item__bot d-flex ${
                item.admin
                  ? " justify-content-start"
                  : "flex-row-reverse mr-auto"
              }`}
            >
              <div className="image-chat">
                <img
                  src={
                    item.admin
                      ? "https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/bot-avatar.png"
                      : "https://secure.gravatar.com/avatar/907826aed3a2f5304136e2442fd82153?s=48&d=mm&r=g"
                  }
                  alt=""
                />
                <p>{item.admin ? "BOT" : data.user_name}</p>
              </div>
              <div
                className="content-chat"
                dangerouslySetInnerHTML={{
                  __html: item[langChat],
                }}
              />
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
