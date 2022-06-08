import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  createUserAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";
import useUsers from "./useUsers";

const useCreateUser = () => {
  const { resCreateUser, user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getAllUsers, pagination } = useUsers();

  const [loadingCreateUser, setLoadingCreateUser] = useState(false);

  const createUser = (payload) => {
    setLoadingCreateUser(true);
    dispatch(createUserAction(payload));
  };

  React.useEffect(() => {
    if (resCreateUser?.status_code === 200) {
      getAllUsers({ page: pagination.current_page });
      setLoadingCreateUser(false);
      NotificationSuccess(
        t("notification"),
        t("admins.crud.user.create_success")
      );
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
    if (resCreateUser && resCreateUser.status_code !== 200) {
      setLoadingCreateUser(false);
      NotificationError(t("notification"), t("admins.crud.user.create_fail"));
    }
  }, [resCreateUser]);

  return {
    user,
    resCreateUser,
    createUser,
    setLoadingCreateUser,
    loadingCreateUser,
  };
};

export default useCreateUser;
