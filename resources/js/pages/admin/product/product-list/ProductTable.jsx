import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
const ProductTable = ({ items, onEdit, onDelete }) => {
  const lang = localStorage.getItem("lang");
  const columns = [
    {
      key: "image",
      dataIndex: "image",
      title: <img className="img-head" src="/images/image.png" alt="" />,
      render: (_, record) => (
        <Link to="#">
          <img src={record.product_image} alt="" height={50} width={50} />
        </Link>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (_, record) => (
        <Link to={`${lang}/admin/product/update/${record.id}`}>
          {record.name}
        </Link>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
      render: (_, record) => <span>{record.price} (JPY)</span>,
    },
    {
      key: "categories",
      dataIndex: "categories",
      title: "Categories",
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      render: (_, record) => (
        <div>
          <span>Published: </span>
          <br />
          {record.created_at}
        </div>
      ),
    },
    {
      key: "store",
      dataIndex: "store",
      title: "Store",
    },
    {
      key: "vi",
      dataIndex: "vi",
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

export default ProductTable;
