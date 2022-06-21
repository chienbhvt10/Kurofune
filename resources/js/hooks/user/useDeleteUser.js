import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error";
import {
  deleteUserAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";
import useUsers from "./useUsers";

const useDeleteUser = () => {
  const { resDeleteUser } = useSelector((state) => state.userState);
  const { selectRole } = useSelector((state) => state.userState);
  const [loadingDeleteUser, setLoadingDeleteUser] = React.useState(false);
  const dispatch = useDispatch();
  const { getAllUsers, pagination } = useUsers();
  const { t } = useTranslation();

  const deleteUser = (payload) => {
    setLoadingDeleteUser(true);
    dispatch(deleteUserAction(payload));
  };

  React.useEffect(() => {
    if (resDeleteUser?.error_code === NO_ERROR) {
      getAllUsers({
        page: pagination.current_page,
        per_page: pagination.per_page,
        role: selectRole,
      });
      NotificationSuccess(t("notification"), resDeleteUser.message);
      setLoadingDeleteUser(false);
      dispatch(resetResCRUDAction());
    }
    if (resDeleteUser && resDeleteUser.error_code === ERROR) {
      setLoadingDeleteUser(false);
      NotificationError(t("notification"), resDeleteUser.error_message);
    }
  }, [resDeleteUser]);

  return {
    resDeleteUser,
    deleteUser,
    loadingDeleteUser,
    setLoadingDeleteUser,
  };
};

export default useDeleteUser;
