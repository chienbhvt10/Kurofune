import React from "react";
import { Link } from "react-router-dom";
import { Pagination, Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
const ProductTable = ({
  items,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}) => {
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
      render: (_, record) => (
        <div>
          <span>Published: </span>
          <br />
          {record.cat_id}
        </div>
      ),
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

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={items}
      bordered={true}
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

export default ProductTable;
