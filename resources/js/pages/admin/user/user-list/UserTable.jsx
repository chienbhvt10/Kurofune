import { Table } from "antd";
import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TableRowAction from "../../../../commons/TableRowAction";
import {
  ACTIVE,
  ACTIVE_TEXT,
  IN_ACTIVE,
  IN_ACTIVE_TEXT,
} from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
export const UserTable = ({
  items,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
  loading,
  loadingDeleteUser,
}) => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const columns = [
    {
      key: "username",
      dataIndex: "username",
      title: t("admins.user.form.field_username"),
      sort: true,
      width: 350,
      render: (_, record) => {
        return (
          <div className="table-column-break">
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
          </div>
        );
      },
    },
    {
      key: "name",
      dataIndex: "name",
      title: t("admins.user.form.field_name"),
      width: 250,
      render: (_, record) => {
        return (
          <div className="table-column-break">
            <span>{record.name}</span>
          </div>
        );
      },
    },
    {
      key: "email",
      dataIndex: "email",
      title: t("admins.user.form.field_email"),
      width: 250,
      render: (_, record) => {
        return (
          <div className="table-column-break">
            <span>{record.email}</span>
          </div>
        );
      },
    },
    {
      key: "role",
      dataIndex: "role",
      title: t("admins.user.form.field_role"),
      headerStyle: {
        width: 150,
      },
      render: (_, record) => {
        return (
          <div className="table-column-break">
            <span>{record?.roles[0]?.name}</span>
          </div>
        );
      },
    },
    {
      key: "active",
      dataIndex: "active",
      title: t("admins.user.form.field_active"),
      headerStyle: {
        width: 150,
      },
      render: (_, record) => (
        <div className="table-column-break">
          <span>
            {record?.active === ACTIVE ? t(ACTIVE_TEXT) : t(IN_ACTIVE_TEXT)}
          </span>
        </div>
      ),
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
        <TableRowAction
          confirmLoading={loadingDeleteUser}
          record={row}
          onDelete={onDelete}
          onEdit={onEdit}
          style={{ display: "flex" }}
        />
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
