import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHead from "../../../commons/PageHead";
import { TableHeader } from "../../../commons/TableHeader";
import useDetailChat from "../../../hooks/logChat/useDetailChat";
import useExportCsv from "../../../hooks/logChat/useExportCSV";
import useExportCsvAll from "../../../hooks/logChat/useExportCSVAll";
import useListChat from "../../../hooks/logChat/useListChat";
import { HistoryChat } from "./history-chat";
import "./log.scss";

const LogChatBot = () => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [langChat, setLangChat] = useState();
  const [idChat, setIdChat] = useState();
  const { listChat, getListChat } = useListChat();
  const { detailChat, getDetailChat } = useDetailChat();
  const { exportCsvUser } = useExportCsv();
  const { exportCsvAll } = useExportCsvAll();
  const { t } = useTranslation();
  React.useEffect(() => {
    if (!listChat) {
      getListChat();
    }
  }, [listChat]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("admins.log_chatbot.username_id"),
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: t("admins.log_chatbot.username"),
      dataIndex: "name_user",
      key: "name_user",
    },
    {
      title: t("admins.log_chatbot.show_history"),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button type="primary" onClick={() => openModalHistory(id, "message")}>
          {t("admins.log_chatbot.btn_show")}
        </Button>
      ),
    },
    {
      title: t("admins.log_chatbot.show_history_ja"),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => openModalHistory(id, "message_ja")}
        >
          {t("admins.log_chatbot.btn_show_ja")}
        </Button>
      ),
    },
    {
      title: t("admins.log_chatbot.created_at"),
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: t("admins.log_chatbot.dow_history"),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          onClick={() => exportHistoryChatBot({ id: id, export_ja: false })}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Button>
      ),
    },
    {
      title: t("admins.log_chatbot.dow_history_ja"),
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          onClick={() => exportHistoryChatBot({ id: id, export_ja: true })}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Button>
      ),
    },
  ];

  const exportHistoryChatBot = (data) => {
    if (data?.id) {
      exportCsvUser(data);
    } else {
      exportCsvAll(data);
    }
  };
  const openModalHistory = (id, langChat) => {
    if (!detailChat || idChat !== id) {
      getDetailChat(id);
      setIdChat(id);
    }
    setLangChat(langChat);
    setVisible(true);
  };

  return (
    <div className="log-container">
      <PageHead
        title={t("meta.title_log_chatbot")}
        content={t("meta.content_log_chatbot")}
      />
      <TableHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Chatbot List", routerLink: "/log-questionnaire" },
        ]}
        title="Chatbot List"
      >
        <div>
          <Button
            type="primary"
            onClick={() => exportHistoryChatBot({ export_ja: false })}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="mr-2"
              style={{ color: "white" }}
            />
            <span>{t("admins.log_chatbot.btn_export")}</span>
          </Button>
          <Button
            className="ml-2"
            type="primary"
            onClick={() => exportHistoryChatBot({ export_ja: true })}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="mr-2"
              style={{ color: "white" }}
            />
            <span>{t("admins.log_chatbot.btn_export_ja")}</span>
          </Button>
        </div>
      </TableHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={listChat}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          showTotal() {
            return `Total ${listChat.length} items`;
          },
        }}
      />
      <Modal
        title={t("admins.log_chatbot.show_history")}
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
