import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  resetResCRUDAction,
  updateUserAction,
} from "../../redux/actions/userAction";
import useUsers from "./useUsers";

const useCreateUser = () => {
  const { resUpdateUser, users } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { getAllUsers, pagination } = useUsers();
  const { t } = useTranslation();

  const updateUser = (payload) => {
    dispatch(updateUserAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateUser?.status_code === 200) {
      NotificationSuccess(t("notification"), t("admins.crud.update_success"));
      navigate(`${lang}/admin/user-list`);
      getAllUsers({ page: pagination.current_page });
      dispatch(resetResCRUDAction());
    }
    if (resUpdateUser && resUpdateUser.status_code !== 200) {
      NotificationError(t("notification"), t("admins.crud.update_fail"));
    }
  }, [resUpdateUser]);
  return {
    users,
    resUpdateUser,
    updateUser,
  };
};

export default useCreateUser;
