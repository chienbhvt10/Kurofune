import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import TableRowAction from "../../../../commons/TableRowAction";
import { Table } from "antd";
export const UserTable = ({ items, onEdit, onDelete }) => {
  const lang = localStorage.getItem("lang");
  const columns = [
    {
      key: "username",
      dataIndex: "username",
      title: "Username",
      sort: true,
      render: (_, record) => {
        return (
          <Link
            to={`${lang}/admin/user-update/${record.id}`}
            className="text-decoration-none d-flex"
          >
            <img
              src={record.imageUrl}
              alt=""
              style={{ width: "25px", height: "25px", marginRight: 10 }}
            />
            <span>{record.username}</span>
          </Link>
        );
      },
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "role",
      dataIndex: "role",
      title: "Role",
      headerStyle: {
        width: 200,
      },
      render: (_, record) => {
        return <span>{record?.roles[0]?.name}</span>;
      },
    },
    {
      key: "tool",
      dataIndex: "tool",
      title: "",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 100,
      },
      render: (cell, row) => (
        <TableRowAction record={row} onDelete={onDelete} onEdit={onEdit} />
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={items} bordered />;
};
