import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NO_ERROR } from "../../../../constants/error";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteUser from "../../../../hooks/user/useDeleteUser";
import useUsers from "../../../../hooks/user/useUsers";
import { selectRoleAction } from "../../../../redux/actions/userAction";

const useHandleUserTable = () => {
  const { getAllUsers, users, pagination, loadingListUser } = useUsers();
  const { deleteUser, loadingDeleteUser } = useDeleteUser();
  const [filterRole, setFilterRole] = React.useState();
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();
  const { selectRole } = useSelector((state) => state.userState);

  React.useEffect(() => {
    if (!searchValue) {
      getAllUsers({
        page: pagination.current_page,
        role: selectRole,
        per_page: pagination.per_page,
      });
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
    dispatch(selectRoleAction(value));

    const temp = {
      per_page: pagination.per_page,
      role: value,
    };
    getAllUsers(searchValue ? { ...temp, name: searchValue } : temp);
  };

  const onResetFilter = () => {
    dispatch(selectRoleAction(undefined));
    getAllUsers({
      page: pagination.current_page,
      per_page: pagination.per_page,
    });
  };

  const onSearch = (values) => {
    const temp = {
      page: pagination.current_page,
      per_page: pagination.per_page,
      name: values.name,
    };
    getAllUsers(
      selectRole || values.name ? { ...temp, role: selectRole } : temp
    );
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;

    getAllUsers({
      page: current,
      per_page: per_page,
      role: selectRole || "",
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
    selectRole,
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
