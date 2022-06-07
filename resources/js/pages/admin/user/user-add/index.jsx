import { Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useCreateUser from "../../../../hooks/user/createUser";
import useUsers from "../../../../hooks/user/useUsers";
import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createUser, resCreateUser, loadingCreateUser } = useCreateUser();
  const { getAllUsers, pagination } = useUsers();
  const lang = getCurrentLanguage();

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = (values) => {
    createUser(values);
    getAllUsers({ page: pagination.current_page });
  };

  return (
    <div id="add-user">
      <UserForm
        loading={loadingCreateUser}
        response={resCreateUser}
        onCancel={onCancel}
        onSave={onSave}
        title={t("admins.user.create.title")}
        typeForm={TYPE_FORM_CREATE}
      />
    </div>
  );
};

export default AddUser;
