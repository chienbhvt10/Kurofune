import React from "react";
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
  resetAuthResponse,
  resetPassword,
} from "../../redux/actions/authAction";

const useResetPassword = () => {
  const { resResetPassword } = useSelector((state) => state.authState);
  const [loadingResetPassword, setLoadingResetPassword] = React.useState();
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getResetPassword = (params) => {
    setLoadingResetPassword(true);
    dispatch(resetPassword(params));
  };

  React.useEffect(() => {
    if (resResetPassword?.error_code === NO_ERROR) {
      setLoadingResetPassword(false);
      NotificationSuccess(t("notification"), resResetPassword.message);
      navigate(`${lang}/login`, { replace: true });
      resetAuthResponse();
    }
    if (resResetPassword && resResetPassword.error_code === ERROR) {
      setLoadingResetPassword(false);
      NotificationError(t("notification"), resResetPassword.error_message);
    }
  }, [resResetPassword]);

  return {
    resResetPassword,
    getResetPassword,
    loadingResetPassword,
    setLoadingResetPassword,
  };
};

export default useResetPassword;
