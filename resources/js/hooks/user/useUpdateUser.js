import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error";
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
  const [loadingUpdateUser, setLoadingUpdateUser] = useState();

  const updateUser = (payload) => {
    setLoadingUpdateUser(true);
    dispatch(updateUserAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateUser?.error_code === NO_ERROR) {
      getAllUsers({ page: pagination.current_page });
      setLoadingUpdateUser(false);
      NotificationSuccess(
        t("notification"),
        t("admins.crud.user.update_success")
      );
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
    if (resUpdateUser && resUpdateUser.error_code === ERROR) {
      setLoadingUpdateUser(false);
      NotificationError(t("notification"), t("admins.crud.user.update_fail"));
    }
  }, [resUpdateUser]);

  return {
    users,
    resUpdateUser,
    updateUser,
    loadingUpdateUser,
    setLoadingUpdateUser,
  };
};

export default useCreateUser;
