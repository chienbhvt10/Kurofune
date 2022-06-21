import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error";
import {
  getCurrentLanguage,
  removeRememberLogin,
  removeAccessToken,
} from "../../helper/localStorage";
import { logout, resetAuthResponse } from "../../redux/actions/authAction";

const useLogout = () => {
  const { resLogout } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const getLogout = () => {
    dispatch(logout());
  };
  React.useEffect(() => {
    if (resLogout && resLogout?.error_code === NO_ERROR) {
      NotificationSuccess(t("notification"), resLogout.message);
      removeRememberLogin();
      removeAccessToken();
      sessionStorage.clear();
      navigate(`${lang}/login`);
      dispatch(resetAuthResponse());
    }
    if (resLogout && resLogout.status_code === ERROR) {
      NotificationError(t("notification"), resLogout.error_message);
    }
  }, [resLogout]);
  return {
    resLogout,
    getLogout,
  };
};

export default useLogout;
