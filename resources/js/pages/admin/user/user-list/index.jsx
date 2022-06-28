import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row, Select } from "antd";
import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useTranslation } from "react-i18next";
import PageHead from "../../../../commons/PageHead";
import { TableHeader } from "../../../../commons/TableHeader";
import { deleteKeyUndefined } from "../../../../helper/handler.js";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useRoles from "../../../../hooks/role/useRoles";
import useExportReportUser from "../../../../hooks/user/useExportReportUser";
import useHandleUserTable from "../hooks/useHandleUserTable";
import "./user-list.scss";
import { UserTable } from "./UserTable";
import useCompany from "../../../../hooks/user/useCompany";
export const UserList = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { exportCsvReportUser } = useExportReportUser();
  const { roles } = useRoles();
  const { company } = useCompany();
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
    selectRole,
    searchValue,
    onChangeCompany,
    selectCompany,
  } = useHandleUserTable();

  function createMarkup() {
    return { __html: t("login.title") };
  }

  const getDepend = () => document.querySelector("#role-select");

  const onExportCsvReportUser = () => {
    const exportParams = deleteKeyUndefined({
      company_name: selectCompany,
      role: selectRole,
      name: searchValue,
    });
    exportCsvReportUser(exportParams);
  };

  return (
    <div className="user-list">
      <PageHead
        title={t("meta.title_user_list")}
        content={t("meta.content_user_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/user-create`}
        title={t("admins.user.list.title")}
        onSearch={onSearch}
        searchField="name"
        searchPlaceHolder={t("admins.user.form.placeholder.search")}
        onChangeSearch={onChangeSearchValue}
        onResetFilter={onResetFilter}
        showReset={true}
      >
        <Row>
          <Col>
            <Button
              className="btn-export"
              type="primary"
              onClick={onExportCsvReportUser}
            >
              <FontAwesomeIcon
                icon={faDownload}
                className="mr-2"
                style={{ color: "white" }}
              />
              <span>{t("admins.log_chatbot.btn_export")}</span>
            </Button>
          </Col>
          <Col id="role-select">
            <Select
              placeholder={t("admins.user.form.placeholder.select_role")}
              onChange={onChangeRole}
              className="select-role"
              getPopupContainer={getDepend}
              value={selectRole}
            >
              {roles.map((item, index) => (
                <Select.Option key={index} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Select
              placeholder={t("admins.user.form.placeholder.select_company")}
              onChange={onChangeCompany}
              className="select-company"
              getPopupContainer={getDepend}
              value={selectCompany}
            >
              {company?.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
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
