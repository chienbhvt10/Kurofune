import React, { useEffect } from 'react'
import './style.scss'
export const Service24H = () => {
  useEffect(() => {
    (function () {
      const sc = document.querySelectorAll("script");
      let activeChat = false;
      sc.forEach((el) => {

        if (
          el.attributes.src?.nodeValue ==
          "https://front.ebot.chat/embed/js/webInit.js"
        ) {
          activeChat = true;
        }
      });
      if (!activeChat) {
        const webJs = document.createElement("script");
        webJs.type = "text/javascript";
        webJs.async = true;
        webJs.src = "https://front.ebot.chat/embed/js/webInit.js";
        webJs.onload = function () {
          webInit("614d7138f7077859ea45725f");
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
    <div className='Service24H container-fluid'>
      <p>Dịch vụ tư vấn 24 giờ</p>
    </div>
  )
}
