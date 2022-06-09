import { Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useUpdateUser from "../../../../hooks/user/useUpdateUser";
import useUser from "../../../../hooks/user/useUser";
import { UserForm } from "../user-form/Phase1UserForm";

const UpdateUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, user, loadingUser } = useUser();

  const { updateUser, resUpdateUser, loadingUpdateUser } = useUpdateUser();
  const lang = getCurrentLanguage();

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = (values) => {
    updateUser(values);
  };

  React.useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <div id="update-user">
      <Spin spinning={loadingUser} tip="Loading...">
        {user && (
          <UserForm
            loading={loadingUpdateUser}
            onCancel={onCancel}
            onSave={onSave}
            item={user}
            title={t("admins.user.update.title")}
            typeForm={TYPE_FORM_UPDATE}
            response={resUpdateUser}
          />
        )}
      </Spin>
    </div>
  );
};

export default UpdateUser;
