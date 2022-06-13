import { Form, Select } from "antd";
import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useRoles from "../../../../hooks/role/useRoles";
import useDeleteUser from "../../../../hooks/user/useDeleteUser";
import useUsers from "../../../../hooks/user/useUsers";
import "./user-list.scss";
import { UserTable } from "./UserTable";
import { isAdmin, isVendor } from "../../../../helper/roles.js";

export const UserList = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { getAllUsers, users, pagination, loadingListUser } = useUsers();
  const { deleteUser, loadingDeleteUser } = useDeleteUser();
  const [filterRole, setFilterRole] = React.useState();
  const [searchValue, setSearchValue] = React.useState();

  const { roles } = useRoles();

  const navigate = useNavigate();
  function createMarkup() {
    return { __html: t("login.title") };
  }

  const onDelete = (row) => () => {
    deleteUser(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/user-update/${row.id}`);
  };

  const onChangeRole = (value) => {
    setFilterRole(value);
    getAllUsers({ page: pagination.current_page, role: value });
  };

  const onSearch = (values) => {
    setSearchValue(values);
    getAllUsers({ page: pagination.current_page, name: values.name });
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAllUsers({
      page: current,
      per_page: per_page,
      role: filterRole || "",
      name: searchValue,
    });
  };

  const getDepend = () => document.querySelector("#role-select");

  return (
    <div className="user-list">
      <TableHeader
        addLink={`${lang}/admin/user-create`}
        title={t("admins.user.list.title")}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: t("admins.user.list.title"), routerLink: "/users" },
        ]}
        onSearch={onSearch}
        searchField="name"
        searchPlaceHolder={t("admins.user.form.placeholder.search")}
      >
        <div id="role-select">
          <Select
            placeholder={t("admins.user.form.placeholder.select_role")}
            onChange={onChangeRole}
            className="select-role"
            getPopupContainer={getDepend}
          >
            {roles.map((item, index) => (
              <Select.Option key={index} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </TableHeader>
      <UserTable
        items={users}
        pagination={pagination}
        loading={loadingListUser}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
        loadingDeleteUser={loadingDeleteUser}
      />
    </div>
  );
};
