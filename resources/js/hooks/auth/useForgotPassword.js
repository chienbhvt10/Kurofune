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
  forgotPassword,
  resetAuthResponse,
} from "../../redux/actions/authAction";

const useForgotPassword = () => {
  const { resForgotPassword } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const getForgotPassword = (params) => {
    dispatch(forgotPassword(params));
  };

  React.useEffect(() => {
    if (resForgotPassword?.status_code === 200) {
      NotificationSuccess(t("notification"), resForgotPassword.message);
      navigate(`${lang}/reset-link-password`);
      dispatch(resetAuthResponse());
    }
    if (resForgotPassword && resForgotPassword.status_code !== 200) {
      NotificationError(t("notification"), resForgotPassword.message);
    }
  }, [resForgotPassword]);
  return {
    resForgotPassword,
    getForgotPassword,
  };
};

export default useForgotPassword;
