import React from "react";
import { memberBoardItemData } from "../../commons/data";
import "./member.scss";
import Board from "../../commons/Board";
import PageHead from "../../commons/PageHead";

const MemberPage = () => {
  return (
    <>
      <PageHead content="Hiệu thuốc online" title="Hiệu thuốc online" />
      <div id="member-page">
        <div className="service_dashboard">
          <Board boardItems={memberBoardItemData} />
        </div>
      </div>
    </>
  );
};

export default MemberPage;
