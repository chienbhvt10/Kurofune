import React from "react";
import { memberBoardItemData } from "../../commons/data";
import "./member.scss";
import Board from "../../commons/Board";
const MemberPage = () => {
  return (
    <div id="member-page">
      <div className="service_dashboard">
        <Board boardItems={memberBoardItemData} />
      </div>
    </div>
  );
};

export default MemberPage;
