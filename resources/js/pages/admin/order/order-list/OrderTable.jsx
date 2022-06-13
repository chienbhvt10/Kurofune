import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'antd';
import { t } from "i18next";
import { getCurrentLanguage } from "../../../../helper/localStorage";
const OrderTable = ({ items }) => {
  const lang = getCurrentLanguage();

  const column = [
    {
      title: t("admins.order.table.field_order"),
      dataIndex: 'orderNumber',
      sorter: (a, b) => a.orderNumber - b.orderNumber,
    },
    {
      title: t("admins.order.table.field_subOrder"),
      dataIndex: 'subOrders',
    },
    {
      title: t("admins.order.table.field_date"),
      dataIndex: 'date',
    },
    {
      title: t("admins.order.table.field_status"),
      dataIndex: 'status',
    },
    {
      title: t("admins.order.table.field_total"),
      dataIndex: 'total',
    },
    {
      title: t("admins.order.table.field_action"),
      dataIndex: 'Action',
      width:100,
      fixed: 'center',
      render: (_, record) =>
        items.length >= 1 ? (
          <Link to={`${lang}/admin/order-update/${record.orderNumber}`}>
            <FontAwesomeIcon
              icon={faCheck}
              style={{
                border: "1px solid ",
                padding: 7,
                borderRadius: 3,
                width: 8,
              }}
            />
          </Link>
        ) : null,
    },
  ];
  

  // const onChange = (pagination, filters, sorter, extra) => {
   
  // };
  return (
    <Table columns={column} dataSource={items}  />

  );
};

export default OrderTable;
