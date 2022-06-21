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
import { NO_ERROR, ERROR } from "../../constants/error";

const useCreateUser = () => {
  const { resCreateUser, user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getAllUsers, pagination } = useUsers();

  const [loadingCreateUser, setLoadingCreateUser] = useState(false);
  const { selectRole } = useSelector((state) => state.userState);

  const createUser = (payload) => {
    setLoadingCreateUser(true);
    dispatch(createUserAction(payload));
  };

  React.useEffect(() => {
    if (resCreateUser?.error_code === NO_ERROR) {
      getAllUsers({
        page: pagination.current_page,
        per_page: pagination.per_page,
        role: selectRole,
      });
      setLoadingCreateUser(false);
      NotificationSuccess(t("notification"), resCreateUser.message);
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
    if (resCreateUser && resCreateUser.error_code === ERROR) {
      setLoadingCreateUser(false);
      NotificationError(t("notification"), resCreateUser.error_message);
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
