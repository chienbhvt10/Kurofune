import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NO_ERROR } from "../../constants/error";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  createUserAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";

const useCreateUser = () => {
  const { resCreateUser, user, loadingCreateUser } = useSelector(
    (state) => state.userState
  );
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { getAllUsers, pagination } = useUsers();
  const { selectRole } = useSelector((state) => state.userState);

  const createUser = (payload) => {
    dispatch(createUserAction(payload));
  };

  React.useEffect(() => {
    if (resCreateUser?.error_code === NO_ERROR) {
      getAllUsers({
        page: pagination.current_page,
        per_page: pagination.per_page,
        role: selectRole,
      });
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    }
  }, [resCreateUser]);

  return {
    user,
    resCreateUser,
    createUser,
    loadingCreateUser,
  };
};

export default useCreateUser;
