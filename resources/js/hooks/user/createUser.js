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
  createUserAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";

const useCreateUser = () => {
  const { resCreateUser, user } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const createUser = (payload) => {
    dispatch(createUserAction(payload));
  };
  React.useEffect(() => {
    if (resCreateUser?.status_code === 200) {
      NotificationSuccess(t("notification"), t("admins.crud.create_success"));
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
    if (resCreateUser && resCreateUser.status_code !== 200) {
      NotificationError(t("notification"), t("admins.crud.create_fail"));
    }
  }, [resCreateUser]);

  return {
    user,
    resCreateUser,
    createUser,
  };
};

export default useCreateUser;
