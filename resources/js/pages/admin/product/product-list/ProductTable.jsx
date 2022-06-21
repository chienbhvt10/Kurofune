import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import { useTranslation } from "react-i18next";
const ProductTable = ({
  items,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
  loading,
}) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const columns = [
    {
      key: "image",
      dataIndex: "image",
      align: "center",
      title: <img className="img-head" src="/images/image.png" alt="" />,
      render: (_, record) => (
        <div className="table-column-break">
          <img src={record.product_image} alt="" height={50} width={50} />
        </div>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: t("admins.product.field_name"),
      render: (_, record) => (
        <div className="table-column-break">
          <Link to={`${lang}/admin/product/update/${record.id}`}>
            {record.name}
          </Link>
        </div>
      ),
    },
    {
      key: "sku",
      dataIndex: "sku",
      title: t("admins.product.sku_field"),
      render: (_, record) => (
        <div className="table-column-break">
          <span>{record.sku || "-"}</span>
        </div>
      ),
    },
    {
      key: "stock",
      dataIndex: "stock",
      title: t("admins.product.stock_status_field"),
      render: (_, record) => <span>{record.stock_status}</span>,
    },
    {
      key: "price",
      dataIndex: "price",
      title: t("admins.product.price_field"),
      render: (_, record) => (
        <span>
          {record.price} {!lang ? "円" : "(JPY)"}
        </span>
      ),
    },
    {
      key: "categories",
      dataIndex: "categories",
      title: t("admins.product.category_field"),
      render: (_, record) => (
        <div className="category-wrapper">
          {record?.categories.map((item) => (
            <span>{item?.name}</span>
          ))}
        </div>
      ),
    },
    {
      key: "date",
      dataIndex: "date",
      title: t("admins.product.date_field"),
      render: (_, record) => (
        <div className="table-column-break">
          <span>
            Published{" "}
            {moment(record.created_at).zone("+09:00").format("YYYY/MM/DD")} at{" "}
            {moment(record.created_at).zone("+09:00").format("LT")}
          </span>
        </div>
      ),
    },
    {
      key: "store",
      dataIndex: "store",
      title: t("admins.product.store_field"),
      render: (_, record) => (
        <div className="category-wrapper">
          {Array.isArray(record?.store)
            ? record?.store.map((item) => <span>{item?.name}</span>)
            : null}
        </div>
      ),
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
        <div className="table-column-break">
          <TableRowAction record={record} onDelete={onDelete} onEdit={onEdit} />
        </div>
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
