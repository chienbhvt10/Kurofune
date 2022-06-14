import React, { useState } from "react";
import "./log.scss";
import { TableHeader } from "../../../commons/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "antd";
import { HistoryChat } from "./history-chat";
import { useTranslation } from "react-i18next";
import useListChat from "../../../hooks/logChat/useListChat";
import useDetailChat from "../../../hooks/logChat/useDetailChat";
import useExportCsv from "../../../hooks/logChat/useExportCSV";
import useExportCsvAll from "../../../hooks/logChat/useExportCSVAll";
const LogChatBot = () => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [langChat, setLangChat] = useState();
  const [idChat, setIdChat] = useState();
  const [contentCSV, setContentCSV] = useState();
  const { listChat, getListChat } = useListChat();
  const { detailChat, getDetailChat } = useDetailChat();
  const { csvUser, exportCsvUser } = useExportCsv();
  const { csvAllUser, exportCsvAll } = useExportCsvAll();
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
      render: (value, item, index) => (page - 1) * 10 + index,
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
  React.useEffect(() => {
    if (!csvUser || !csvAllUser || contentCSV) {
      if (contentCSV?.id) {
        exportCsvUser(contentCSV);
      } else {
        exportCsvAll(contentCSV);
      }
    }
  }, [contentCSV]);

  React.useEffect(() => {
    if (csvUser || csvAllUser) {
      contentCSV?.id
        ? downloadBlob(csvUser, contentCSV?.id)
        : downloadBlob(csvAllUser);
    }
  }, [csvUser, csvAllUser, contentCSV]);

  const exportHistoryChatBot = (data) => {
    setContentCSV(data);
  };
  const openModalHistory = (id, langChat) => {
    if (!detailChat || idChat !== id) {
      getDetailChat(id);
      setIdChat(id);
    }
    setLangChat(langChat);
    setVisible(true);
  };

  const downloadBlob = (content, idUser) => {
    const dateExported = new Date();
    const BOM = "\uFEFF";
    content = BOM + content;
    const blob = new Blob([content], { type: "data:text/csv;charset=utf-8," });
    const url = URL.createObjectURL(blob);
    let dow = document.createElement("a");
    dow.href = url;
    const fileName = `${idUser ? "User" + idUser + "_" : ""}chat_log_export_${
      dateExported.toISOString().split("T")[0]
    }.csv`;
    dow.setAttribute("download", fileName);
    dow.click();
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
        }}
      />
      <Modal
        title= {t("admins.log_chatbot.show_history")}
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
