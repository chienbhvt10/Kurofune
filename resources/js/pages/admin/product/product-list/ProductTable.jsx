import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
const ProductTable = ({
  items,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
  loading,
}) => {
  const lang = getCurrentLanguage();
  const columns = [
    {
      key: "image",
      dataIndex: "image",
      align: "center",
      title: <img className="img-head" src="/images/image.png" alt="" />,
      render: (_, record) => (
        <img src={record.product_image} alt="" height={50} width={50} />
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (_, record) => (
        <Link to={`${lang}/admin/product/update/${record.id}`}>
          {record.name || record?.translations[0]?.name}
        </Link>
      ),
    },
    {
      key: "sku",
      dataIndex: "sku",
      title: "SKU",
      render: (_, record) => <span>{record.sku}</span>,
    },
    {
      key: "stock",
      dataIndex: "stock",
      title: "Stock",
      render: (_, record) => <span>{record.stock_status}</span>,
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
      render: (_, record) => <span>{record.categories}</span>,
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      render: (_, record) => (
        <span>
          Published {moment(record.created_at).format("YYYY/MM/DD")} at{" "}
          {moment(record.created_at).format("LT")}
        </span>
      ),
    },
    {
      key: "store",
      dataIndex: "store",
      title: "Store",
      render: (_, record) => <span>{record.store}</span>,
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
      bordered
      onChange={onTableChange}
      loading={loading}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        current: pagination.current_page,
        total: pagination.total,
        pageSize: pagination.per_page,
        showTotal: () => `Total ${pagination.total} items`,
      }}
    />
  );
};

export default ProductTable;
