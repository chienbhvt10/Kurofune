import React, { useState } from "react";
import "./log.scss";
import { Link } from "react-router-dom";
import { TableHeader } from "../../../commons/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "antd";
import useListChat from "../../../hooks/logChat/useListChat";
import { HistoryChat } from "./history-chat";
import useDetailChat from "../../../hooks/logChat/useDetailChat";

const LogChatBot = () => {
  const [page, setPage] = React.useState(1);
  const { getListChat, listChat } = useListChat();
  const { getDetailChat, detailChat } = useDetailChat();
  const [visible, setVisible] = useState(false);
  const [langChat, setLangChat] = useState("");
  const [idChat, setIdChat] = useState();

  React.useEffect(() => {
    if (!listChat) {
      getListChat();
    }
  }, [listChat]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "ユーザーID",
      dataIndex: "user_id",
    },
    {
      title: "ユーザー名",
      dataIndex: "name_user",
    },
    {
      title: "チャット履歴",
      dataIndex: "id",
      render: (id) => (
        <Button type="primary" onClick={() => openModalHistory(id, "message")}>
          表示
        </Button>
      ),
    },
    {
      title: "チャット履歴 (日本語）",
      dataIndex: "id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => openModalHistory(id, "message_ja")}
        >
          日本語で表示
        </Button>
      ),
    },
    {
      title: "作成日",
      dataIndex: "create_date",
    },
    {
      title: "ダウンロード",
      dataIndex: "id",
      render: (id) => (
        <Link to="/" className="btn-download-csv">
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Link>
      ),
    },
    {
      title: "ダウンロード(日本語）",
      dataIndex: "id",
      render: (id) => (
        <Link to="/" className="btn-download-csv">
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Link>
      ),
    },
  ];
  const openModalHistory = (id, langChat) => {
    console.log(idChat !== id, !detailChat && idChat !== id, id, idChat);
    if (!detailChat || idChat !== id) {
      getDetailChat(id);
      setIdChat(id);
    }
    setLangChat(langChat);
    setVisible(true);
  };
  return (
    <div className="log-container">
      <TableHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Chatbot List", routerLink: "/log-questionnaire" },
        ]}
        title="Chatbot List"
      >
        <div>
          <Button type="primary">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span> CSVダウンロード</span>
          </Button>
          <Button className="ml-2" type="primary">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span> CSVダウンロード (日本語）</span>
          </Button>
        </div>
      </TableHeader>
      <Table
        columns={columns}
        dataSource={listChat}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
      <Modal
        title="History chatbot"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={"1000"}
      >
        <HistoryChat data={detailChat} langChat={langChat} />
      </Modal>
    </div>
  );
};

export default LogChatBot;
