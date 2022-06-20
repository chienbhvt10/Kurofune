import { Select } from "antd";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import PageHead from "../../../../commons/PageHead";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useRoles from "../../../../hooks/role/useRoles";
import useHandleUserTable from "../hooks/useHandleUserTable";
import "./user-list.scss";
import { UserTable } from "./UserTable";

export const UserList = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const {
    loadingDeleteUser,
    loadingListUser,
    onChangeRole,
    onChangeSearchValue,
    onDelete,
    onEdit,
    onSearch,
    onTableChange,
    onResetFilter,
    pagination,
    users,
    filterRole,
  } = useHandleUserTable();

  const { roles } = useRoles();

  function createMarkup() {
    return { __html: t("login.title") };
  }

  const getDepend = () => document.querySelector("#role-select");

  return (
    <div className="user-list">
      <PageHead
        title={t("meta.title_user_list")}
        content={t("meta.content_user_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/user-create`}
        title={t("admins.user.list.title")}
        breadcrumb={[]}
        onSearch={onSearch}
        searchField="name"
        searchPlaceHolder={t("admins.user.form.placeholder.search")}
        onChangeSearch={onChangeSearchValue}
        onResetFilter={onResetFilter}
        showReset={true}
      >
        <div id="role-select">
          <Select
            placeholder={t("admins.user.form.placeholder.select_role")}
            onChange={onChangeRole}
            className="select-role"
            getPopupContainer={getDepend}
            value={filterRole}
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
