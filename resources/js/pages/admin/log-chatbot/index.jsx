import React from "react";
import LogTable from "./LogTable";
import "./log.scss";
import { Link } from "react-router-dom";
const LogChatBot = () => {
  const items = [
    {
      no: "1",
      id: "1",
      username: "chien",
      createdAt: "12/4",
    },
    {
      no: "2",
      id: "2",
      username: "chien2",
      createdAt: "12/4",
    },
    {
      no: "3",
      id: "4",
      username: "chien3",
      createdAt: "12/4",
    },
  ];
  return (
    <div className="log-container">
      <div className="btn-group">
        <Link to="/" className="btn-show">
          <img src="" alt="" />
          <span> CSVダウンロード</span>
        </Link>
        <Link to="/" className="btn-show">
          <img src="" alt="" />
          <span> CSVダウンロード (日本語）</span>
        </Link>
      </div>
      <LogTable items={items} />
    </div>
  );
};

export default LogChatBot;
