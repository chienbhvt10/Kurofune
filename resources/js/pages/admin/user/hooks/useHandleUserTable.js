import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteKeyUndefined } from "../../../../helper/handler";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteUser from "../../../../hooks/user/useDeleteUser";
import useExportReportUser from "../../../../hooks/user/useExportReportUser";
import useImportUser from "../../../../hooks/user/useImportUser";
import useUsers from "../../../../hooks/user/useUsers";
import {
  selectCompanyAction,
  selectRoleAction,
} from "../../../../redux/actions/userAction";

const useHandleUserTable = () => {
  const { getAllUsers, users, pagination, loadingListUser } = useUsers();
  const { deleteUser, loadingDeleteUser } = useDeleteUser();
  const [searchValue, setSearchValue] = React.useState();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();
  const { selectRole } = useSelector((state) => state.userState);
  const { selectCompany } = useSelector((state) => state.userState);
  const { exportCsvReportUser } = useExportReportUser();
  const { importCsvUser } = useImportUser();
  const [fileCsv, setFileCsv] = React.useState();

  React.useEffect(() => {
    if (!searchValue) {
      const temp = {
        page: pagination.current_page,
        role: selectRole,
        company_name: selectCompany,
        per_page: pagination.per_page,
      };
      getAllUsers(deleteKeyUndefined(temp));
    }
  }, [searchValue, fileCsv]);

  React.useEffect(() => {
    if (fileCsv) {
      const formData = new FormData();
      formData.append("file_upload", fileCsv);
      importCsvUser(formData);
    }
  }, [fileCsv]);

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
      company_name: selectCompany,
      name: searchValue,
    };
    getAllUsers(deleteKeyUndefined(temp));
  };

  const onChangeCompany = (value) => {
    dispatch(selectCompanyAction(value));

    const temp = {
      per_page: pagination.per_page,
      company_name: value,
      role: selectRole,
      name: searchValue || undefined,
    };
    getAllUsers(deleteKeyUndefined(temp));
  };

  const onResetFilter = () => {
    dispatch(selectRoleAction(undefined));
    dispatch(selectCompanyAction(undefined));

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
      role: selectRole || undefined,
      company_name: selectCompany || undefined,
    };
    getAllUsers(deleteKeyUndefined(temp));
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    const temp = {
      page: current,
      per_page: per_page,
      role: selectRole || undefined,
      company_name: selectCompany || undefined,
      name: searchValue,
    };
    getAllUsers(deleteKeyUndefined(temp));
  };

  const onExportCsvReportUser = () => {
    const exportParams = deleteKeyUndefined({
      company_name: selectCompany,
      role: selectRole,
      name: searchValue,
    });
    exportCsvReportUser(exportParams);
  };

  const onChangeFileCsv = (file) => {
    setFileCsv(file);
  };

  return {
    users,
    pagination,
    loadingListUser,
    loadingDeleteUser,
    searchValue,
    selectRole,
    selectCompany,
    onChangeCompany,
    onChangeRole,
    onChangeSearchValue,
    onDelete,
    onEdit,
    onSearch,
    onTableChange,
    onResetFilter,
    onChangeFileCsv,
    onExportCsvReportUser,
  };
};

export default useHandleUserTable;
