import { Table } from "antd";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TableRowAction from "../../../../commons/TableRowAction";
import { ACTIVE, ACTIVE_TEXT, IN_ACTIVE_TEXT } from "../../../../constants";
import { EMPTY_TABLE_LIST } from "../../../../constants/emptyTable";
import { getCurrentLanguage } from "../../../../helper/localStorage";

export const UserTable = (props) => {
  const {
    items,
    onEdit,
    onDelete,
    pagination,
    onTableChange,
    loading,
    loadingDeleteUser,
  } = props;
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const columns = [
    {
      key: "username",
      dataIndex: "username",
      title: t("admins.user.form.field_username"),
      sort: true,
      render: (_, record) => {
        return (
          <Link
            to={`${lang}/admin/user-update/${record.id}`}
            className="text-decoration-none d-flex"
          >
            <img
              className="avatar-image"
              src={record.avatar || "/avatars/default.png"}
              alt=""
            />
            <span className="user-name-td">{record.username}</span>
          </Link>
        );
      },
    },
    {
      key: "name",
      dataIndex: "name",
      title: t("admins.user.form.field_name"),
      render: (_, record) => {
        return <div className="name-td">{record.name}</div>;
      },
    },
    {
      key: "email",
      dataIndex: "email",
      title: t("admins.user.form.field_email"),
      render: (_, record) => {
        return <div className="email-td">{record.email}</div>;
      },
    },
    {
      key: "role",
      dataIndex: "role",
      title: t("admins.user.form.field_role"),
      render: (_, record) => {
        return <div className="role-td">{record?.roles[0]?.name}</div>;
      },
    },
    {
      key: "active",
      dataIndex: "active",
      title: t("admins.user.form.field_active"),
      render: (_, record) => {
        return (
          <div className="active-td">
            {record?.active === ACTIVE ? t(ACTIVE_TEXT) : t(IN_ACTIVE_TEXT)}
          </div>
        );
      },
    },
    {
      key: "tool",
      dataIndex: "tool",
      title: "",
      align: "center",
      headerAlign: "center",
      render: (cell, row) => (
        <TableRowAction
          confirmLoading={loadingDeleteUser}
          record={row}
          onDelete={onDelete}
          onEdit={onEdit}
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
