import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../../../hooks/user/useUser";
import useUpdateUser from "../../../../hooks/user/useUpdateUser";

import { UserForm } from "../user-form/Phase1UserForm";
import useUsers from "../../../../hooks/user/useUsers";
import { useDispatch } from "react-redux";
import { resetResCRUDAction } from "../../../../redux/actions/userAction";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import { useTranslation } from "react-i18next";

const UpdateUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, user } = useUser();
  const dispatch = useDispatch();

  const { getAllUsers, pagination } = useUsers();

  const { updateUser, resUpdateUser } = useUpdateUser();
  const lang = getCurrentLanguage();

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = async (values) => {
    await updateUser(values);
    await getAllUsers({ page: pagination.current_page });
  };

  React.useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (resUpdateUser?.status_code === 200) {
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    } else {
      return;
    }
  }, [resUpdateUser]);

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
