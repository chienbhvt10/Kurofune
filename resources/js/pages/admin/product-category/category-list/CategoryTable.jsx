import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";

const CategoryTable = ({ items, onDelete, onEdit }) => {
  const lang = localStorage.getItem("lang");

  const columns = [
    {
      key: "image",
      dataIndex: "image",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      title: <img className="img-head" src="/images/image.png" alt="" />,
      render: (_, record) => (
        <Link to="#">
          <img src={record.category_image} alt="" width={40} />
        </Link>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (_, record) => (
        <Link
          to={`${lang}/admin/category/update/${record.id}`}
          className="text-decoration-none d-flex"
        >
          {record.name}
        </Link>
      ),
    },
    {
      key: "slug",
      dataIndex: "slug",
      title: "Slug",
      render: (_, record) => <span>{record.slug}</span>,
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      render: (_, record) => <span>{record.type}</span>,
    },
    {
      key: "tool",
      dataIndex: "tool",
      title: <img className="img-head" src="/images/vietnam.png" alt="" />,
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 100,
      },
      render: (_, record) => (
        <TableRowAction record={record} onDelete={onDelete} onEdit={onEdit} />
      ),
    },
  ];
  return <Table rowKey="id" columns={columns} dataSource={items} bordered />;
};

export default CategoryTable;
