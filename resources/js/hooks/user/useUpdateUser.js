import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NO_ERROR } from "../../constants/error";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  resetResCRUDAction,
  updateUserAction,
} from "../../redux/actions/userAction";
import useUsers from "../../hooks/user/useUsers";
const useCreateUser = () => {
  const { selectRole } = useSelector((state) => state.userState);
  const { resUpdateUser, users, loadingUpdateUser } = useSelector(
    (state) => state.userState
  );
  const { getAllUsers, pagination } = useUsers();
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();

  const updateUser = (payload) => {
    dispatch(updateUserAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateUser?.error_code === NO_ERROR) {
      getAllUsers({
        page: pagination.current_page,
        per_page: pagination.per_page,
        role: selectRole,
      });
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
  }, [resUpdateUser]);

  return {
    users,
    resUpdateUser,
    updateUser,
    loadingUpdateUser,
  };
};

export default useCreateUser;
