import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Image, Table } from "antd";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import { useTranslation } from "react-i18next";
import { EMPTY_TABLE_LIST } from "../../../../constants/emptyTable";
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
        <div className="table-column-break td-image">
          <Image
            src={record.product_image}
            onError={(e) => (e.target.src = "/images/image-default.png")}
            alt=""
            height={50}
            width={50}
          />
        </div>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: t("admins.product.field_name"),
      render: (_, record) => (
        <div className="table-column-break td-name">
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
        <div className="table-column-break td-sku">
          <span>{record.sku || "-"}</span>
        </div>
      ),
    },
    {
      key: "stock",
      dataIndex: "stock",
      title: t("admins.product.stock_status_field"),
      render: (_, record) => (
        <div className="td-status">{record.stock_status}</div>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: t("admins.product.price_field"),
      render: (_, record) => (
        <div className="td-price">
          {record.price} {!lang ? "円" : "(JPY)"}
        </div>
      ),
    },
    {
      key: "categories",
      dataIndex: "categories",
      title: t("admins.product.category_field"),
      render: (categories) => (
        <div className="category-wrapper td-categories">
          {categories?.map((item, i) => (
            <span key={i}>{item?.name}</span>
          ))}
        </div>
      ),
    },
    {
      key: "date",
      dataIndex: "date",
      title: t("admins.product.date_field"),
      render: (_, record) => (
        <div className="table-column-break td-date">
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
      render: (store) => (
        <div className="category-wrapper td-store">
          {store?.map((item, index) => (
            <span key={index}>{item?.name}</span>
          ))}
        </div>
      ),
    },
    {
      key: "tool",
      dataIndex: "tool",
      align: "center",
      headerAlign: "center",
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
      scroll={{ x: 1000 }}
      pagination={{
        showSizeChanger: true,
        showPrevNextJumpers: false,
        pageSizeOptions: ["5", "10", "20", "50", "100"],
        current: pagination.current_page,
        total: pagination.total,
        pageSize: pagination.per_page,
        showTotal: () => `Total ${pagination.total} items`,
      }}
      locale={EMPTY_TABLE_LIST()}
    />
  );
};

export default ProductTable;
