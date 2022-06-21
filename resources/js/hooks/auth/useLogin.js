import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "../../commons/Notification";
import { REMEMBER_LOGIN_VALUES, USER_ROLES } from "../../constants";
import { ERROR, NO_ERROR } from "../../constants/error";
import {
  getCurrentLanguage,
  setAccessToken,
  setRememberLogin,
} from "../../helper/localStorage";
import { login } from "../../redux/actions/authAction";
import useShowProfile from "./useShowProfile";

const useLogin = () => {
  const { resLogin,isLoadingLogin } = useSelector((state) => state.authState);
  const [remember, setRemember] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const { profile } = useShowProfile();

  const loginUser = (values) => {

    setRemember(values.remember);
    dispatch(login(values));
  };

  React.useEffect(() => {
    if (remember && profile) {
      loginUser();
    }
  }, [remember, profile]);

  React.useEffect(() => {
    if (resLogin?.error_code === NO_ERROR) {
      if (remember) {
        setRememberLogin(REMEMBER_LOGIN_VALUES);
        setAccessToken(resLogin.data?.access_token);
      } else {
        sessionStorage.setItem("access_token", resLogin.data?.access_token);
      }
    }
  }, [resLogin]);

  React.useEffect(() => {
    if (resLogin?.error_code === NO_ERROR) {
      if (resLogin?.data?.user?.roles?.name === USER_ROLES.ADMIN) {
        navigate(`${lang}/admin`);
      } else if (resLogin?.data?.user?.roles?.name === USER_ROLES.VENDOR) {
        navigate(`${lang}/admin/product-list`);
      } else {
        navigate(`${lang}/media`);
      }
    }
    if (resLogin && resLogin.error_code === ERROR) {
      NotificationError(t("notification"), resLogin.error_message);
    }
  }, [resLogin]);
  return {
    resLogin,
    loginUser,
    isLoadingLogin
  };
};

export default useLogin;
