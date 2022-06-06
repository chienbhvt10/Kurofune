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
  resetAuthResponse,
  resetPassword,
} from "../../redux/actions/authAction";

const useResetPassword = () => {
  const { resResetPassword } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getResetPassword = (params) => {
    dispatch(resetPassword(params));
  };

  React.useEffect(() => {
    if (resResetPassword?.status_code === 200) {
      NotificationSuccess(t("notification"), resResetPassword.message);
      navigate(`${lang}/login`, { replace: true });
      resetAuthResponse();
    }
    if (resResetPassword && resResetPassword.status_code !== 200) {
      NotificationError(t("notification"), resResetPassword.message);
    }
  }, [resResetPassword]);

  return {
    resResetPassword,
    getResetPassword,
  };
};

export default useResetPassword;
