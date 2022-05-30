import { Table } from "antd";
import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import TableRowAction from "../../../../commons/TableRowAction";
export const UserTable = ({
  items,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}) => {
  const lang = localStorage.getItem("lang");
  const columns = [
    {
      key: "username",
      dataIndex: "username",
      title: "Username",
      sort: true,
      width: 350,
      render: (_, record) => {
        return (
          <Link
            to={`${lang}/admin/user-update/${record.id}`}
            className="text-decoration-none d-flex"
          >
            <img
              src={record.avatar || "/avatars/default.png"}
              alt=""
              style={{
                width: "25px",
                height: "25px",
                marginRight: 10,
                objectFit: "cover",
              }}
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
      width: 250,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      width: 250,
    },
    {
      key: "role",
      dataIndex: "role",
      title: "Role",
      headerStyle: {
        width: 150,
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

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={items}
      bordered
      onChange={onTableChange}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        total: pagination.total,
        pageSize: pagination.per_page,
        showTotal: () => `Total ${pagination.total} items`,
      }}
    />
  );
};
