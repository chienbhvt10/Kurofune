import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../../../commons/TableHeader";
import { DEFAULT_LIMIT } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteUser from "../../../../hooks/user/useDeleteUser";
import useUsers from "../../../../hooks/user/useUsers";
import "./user-list.scss";
import { UserTable } from "./UserTable";

export const UserList = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { getAllUsers, users, pagination } = useUsers();
  const { deleteUser } = useDeleteUser();

  const navigate = useNavigate();
  function createMarkup() {
    return { __html: t("login.title") };
  }
  React.useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  }, [users]);
  const onDelete = (row) => async () => {
    await deleteUser(row.id);
    await getAllUsers({ page: pagination.current_page });
  };
  const onEdit = (row) => () => {
    navigate(`${lang}/admin/user-update/${row.id}`);
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAllUsers({ page: current, per_page: per_page });
  };

  return (
    <div className="user-list">
      <TableHeader
        addLink={`${lang}/admin/user-create`}
        title={t("admins.user.list.title")}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: t("admins.user.list.title"), routerLink: "/users" },
        ]}
      />
      <UserTable
        items={users}
        pagination={pagination}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
      />
    </div>
  );
};
