import { Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TableRowAction from "./../../../../commons/TableRowAction/index";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { EMPTY_TABLE_LIST } from "../../../../constants/emptyTable";

const TaxTable = ({ items, onDelete, onEdit,loading, pagination, onTableChange }) => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const columns = [
    {
      key: "name",
      dataIndex: "name",
      align: "center",
      headerAlign: "center",
      width: "40%",
      headerStyle: {
        width: 50,
      },
      title: <span>{t("admins.tax.title.name_title")}</span>,
      render: (_, record) => <span>{record.name}</span>,
    },
    {
      key: "value",
      dataIndex: "value",
      align: "center",
      headerAlign: "center",
      width: "40%",
      headerStyle: {
        width: 50,
      },
      title: <span>{t("admins.tax.title.value_title")} ( % )</span>,
      render: (_, record) => <span>{record.value}</span>,
    },
    {
      key: "tool",
      dataIndex: "tool",
      align: "center",
      headerAlign: "center",
      width: "20%",
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
        pageSize: pagination.per_page,
        total: pagination.total,
        showTotal: () => `Total ${pagination.total} items`,
      }}
      locale={EMPTY_TABLE_LIST()}
    />
  );
};

export default TaxTable;
