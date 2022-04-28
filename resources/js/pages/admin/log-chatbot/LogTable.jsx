import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
const LogTable = ({ items }) => {
  const columns = [
    {
      dataField: "no",
      text: "No.",
      sort: true,
      headerStyle: {
        width: 100,
      },
    },
    {
      dataField: "id",
      text: "ID",
      headerStyle: {
        width: 100,
      },
    },
    {
      dataField: "username",
      text: "ユーザーID",
    },
    {
      dataField: "chatHistory",
      text: "チャット履歴",

      formatter: (cell, row) => (
        <Link to="/" className="btn-show-custom">
          <img src="" alt="" />
          <span>表示</span>
        </Link>
      ),
    },
    {
      dataField: "chatHistoryJapan",
      text: "チャット履歴(日本語）",
      formatter: (cell, row) => (
        <Link to="/" className="btn-show-custom">
          <img src="" alt="" />
          <span>日本語で表示</span>
        </Link>
      ),
    },
    {
      dataField: "createdAt",
      text: "作成日",
      formatter: (cell, row) => <span>{row.createdAt}</span>,
      headerStyle: {
        width: 150,
      },
    },
    {
      dataField: "download",
      text: "ダウンロード",
      formatter: (cell, row) => (
        <Link to="/" className="btn-download-csv">
          <img src="/images/download.png" alt="" />
        </Link>
      ),
    },
    {
      dataField: "downloadJapan",
      text: "ダウンロード(日本語）",
      formatter: (cell, row) => (
        <Link to="/" className="btn-download-csv">
          <img src="/images/download.png" alt="" />
        </Link>
      ),
    },
  ];
  const defaultSorted = [{ dataField: "name", order: "desc" }];
  return (
    <BootstrapTable
      keyField="id"
      columns={columns}
      data={items}
      defaultSorted={defaultSorted}
      selectRow={{ mode: "checkbox" }}
      bootstrap4
      bordered
      hover
      striped
      tabIndexCell
    />
  );
};

export default LogTable;
