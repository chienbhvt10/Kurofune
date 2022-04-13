import React from "react";
import "./member.scss";
const MemberPage = () => {
  return (
    <div id="member-page">
      <div className="service_dashboard">
        <div className="board-container">
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/member/questionnaire"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/Questionnaire-form.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">問診票</h3>
              </div>
            </a>
          </div>
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/list-of-pharmacies"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/list-pharmacies.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">薬局情報</h3>
              </div>
            </a>
          </div>
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/medicine-list"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/medicine-list.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">薬剤情報</h3>
              </div>
            </a>
          </div>
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/member/order-history"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/Order-history.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">注文履歴</h3>
              </div>
            </a>
          </div>
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/cart"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/cart.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">買い物かご</h3>
              </div>
            </a>
          </div>
          <div className="board-item">
            <a
              href="https://member.wabisabi.media/member/billing-address"
              className="item"
              title=""
            >
              <div className="icon">
                <img src="images/top-page/Settings.png" alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">登録情報</h3>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
