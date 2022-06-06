import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { getCurrentLanguage } from "../../helper/localStorage";
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
    if (resLogout?.status_code === 200) {
      NotificationSuccess(t("notification"), resLogout.message);
      navigate(`${lang}/login`);
    }
    if (resLogout && resLogout.status_code !== 200) {
      NotificationError(t("notification"), resLogout.message);
    }
  }, [resLogout]);
  return {
    resLogout,
    getLogout,
  };
};

export default useLogout;
