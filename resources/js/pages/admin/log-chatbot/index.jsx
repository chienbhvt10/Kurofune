import React from "react";
import LogTable from "./LogTable";
import "./log.scss";
import { Link } from "react-router-dom";
import { TableHeader } from "../../../commons/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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
      <TableHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Chatbot List", routerLink: "/log-questionnaire" },
        ]}
        title="Chatbot List"
      >
        <div className="btn-group">
          <Link to="/" className="btn-show">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span> CSVダウンロード</span>
          </Link>
          <Link to="/" className="btn-show">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span> CSVダウンロード (日本語）</span>
          </Link>
        </div>
      </TableHeader>
      <LogTable items={items} />
    </div>
  );
};

export default LogChatBot;
