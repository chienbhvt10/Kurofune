import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  deleteUserAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";
import useUsers from "./useUsers";

const useDeleteUser = () => {
  const { resDeleteUser } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const { getAllUsers, pagination } = useUsers();
  const { t } = useTranslation();

  const deleteUser = (payload) => {
    dispatch(deleteUserAction(payload));
  };

  React.useEffect(() => {
    if (resDeleteUser?.status_code === 200) {
      getAllUsers({ page: pagination.current_page });
      NotificationSuccess(
        t("notification"),
        t("admins.crud.user.delete_success")
      );
      dispatch(resetResCRUDAction());
    }
    if (resDeleteUser && resDeleteUser.status_code !== 200) {
      NotificationError(t("notification"), t("admins.crud.user.delete_fail"));
    }
  }, [resDeleteUser]);

  return {
    resDeleteUser,
    deleteUser,
  };
};

export default useDeleteUser;
