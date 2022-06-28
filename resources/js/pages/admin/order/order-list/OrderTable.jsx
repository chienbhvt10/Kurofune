import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popconfirm, Table, Tag } from "antd";
import { t } from "i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage";

import TableRowAction from "./../../../../commons/TableRowAction/index";
import moment from "moment";
import { EMPTY_TABLE_LIST } from "../../../../constants/emptyTable";
const OrderTable = ({ items, onChange, handleDeleteOrder }) => {
  const lang = getCurrentLanguage();
  let navigate = useNavigate();
  const confirmDelete =
    ({ id }) =>
    () => {
      handleDeleteOrder(id);
    };
  const onEdit =
    ({ id }) =>
    () => {
      navigate(`${lang}/admin/order-update/${id}`);
    };

  const column = [
    {
      title: t("admins.order.table.field_id"),
      dataIndex: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: t("admins.order.table.field_full_name"),
      width: "30%",
      dataIndex: "shipping_full_name",
    },
    {
      title: t("admins.order.table.field_date"),
      dataIndex: "created_at",
      width: "20%",
      render: (_, record) => {
        return <>{moment(record.created_at).format("YYYY/MM/DD hh:ss")}</>;
      },
    },
    {
      title: t("admins.order.table.field_status"),
      dataIndex: "status",
      width: "10%",
      filters: [
        { value: "awaiting confirm", text: "Awaiting confirm" },
        { value: "packing", text: "Packing" },
        { value: "delivery", text: "Delivery" },
        { value: "shipping", text: "Shipping" },
        { value: "completed", text: "Completed" },
      ],
      onFilter: (value, record) =>
        record.status.indexOf(value) === 0,
      render: (_, record) => {
        return (
          <Tag color="success">
            {String(record.status).toLocaleUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: t("admins.order.table.field_total"),
      dataIndex: "total",
    },

    {
      align: "center",
      headerAlign: "center",
      title: t("admins.order.table.field_action"),
      headerStyle: {
        width: 100,
      },
      render: (_, record) => (
        <TableRowAction
          record={record}
          onDelete={confirmDelete}
          onEdit={onEdit}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey={"id"}
      columns={column}
      dataSource={items}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        defaultPageSize: 10,
      }}
      onChange={onChange}
      locale={EMPTY_TABLE_LIST()}
    />
  );
};

export default OrderTable;
