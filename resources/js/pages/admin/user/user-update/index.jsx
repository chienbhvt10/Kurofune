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
  const { getUser, user } = useUser();

  const { updateUser, resUpdateUser } = useUpdateUser();
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
      {user && (
        <UserForm
          onCancel={onCancel}
          onSave={onSave}
          item={user}
          title={t("admins.user.update.title")}
          typeForm={TYPE_FORM_UPDATE}
          response={resUpdateUser}
        />
      )}
    </div>
  );
};

export default UpdateUser;
