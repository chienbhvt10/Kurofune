import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteUser from "../../../../hooks/user/useDeleteUser";
import useUsers from "../../../../hooks/user/useUsers";

const useHandleUserTable = () => {
  const { getAllUsers, users, pagination, loadingListUser } = useUsers();
  const { deleteUser, loadingDeleteUser } = useDeleteUser();
  const [filterRole, setFilterRole] = React.useState();
  const [searchValue, setSearchValue] = React.useState();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();

  React.useEffect(() => {
    if (!searchValue) {
      getAllUsers({ page: 1, role: filterRole });
    }
  }, [searchValue]);

  const onDelete = (row) => () => {
    deleteUser(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/user-update/${row.id}`);
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onChangeRole = (value) => {
    setFilterRole(value);
    const temp = {
      page: 1,
      role: value,
    };
    getAllUsers(searchValue ? { ...temp, name: searchValue } : temp);
  };

  const onResetFilter = () => {
    setFilterRole(undefined);
    getAllUsers({ page: 1, name: searchValue });
  };

  const onSearch = (values) => {
    const temp = {
      page: 1,
      name: values.name,
    };
    getAllUsers(
      filterRole || values.name ? { ...temp, role: filterRole } : temp
    );
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

  return {
    users,
    pagination,
    loadingListUser,
    loadingDeleteUser,
    filterRole,
    searchValue,
    onChangeRole,
    onChangeSearchValue,
    onDelete,
    onEdit,
    onSearch,
    onTableChange,
    onResetFilter,
  };
};

export default useHandleUserTable;
