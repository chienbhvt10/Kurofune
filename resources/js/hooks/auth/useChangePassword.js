import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  changePasswordAction,
  resetAuthResponse,
} from "../../redux/actions/authAction";
import useLogout from "./useLogout";

const useChangePassword = () => {
  const { resChangePassword } = useSelector((state) => state.authState);
  const { getLogout, resLogout } = useLogout();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();
  const changePassword = (payload) => {
    dispatch(changePasswordAction(payload));
  };
  React.useEffect(() => {
    if (resChangePassword?.status_code === 200) {
      NotificationSuccess(t("notification"), resChangePassword.message);
      getLogout();
      dispatch(resetAuthResponse());
    }
    if (resChangePassword && resChangePassword.status_code !== 200) {
      NotificationError(t("notification"), resChangePassword.message);
    }
  }, [resChangePassword]);

  React.useEffect(() => {
    if (
      resLogout?.status_code === 200 &&
      resChangePassword?.status_code === 200
    ) {
      NotificationSuccess(t("notification"), resLogout.message);
      navigate(`${lang}/login`);
      dispatch(resetAuthResponse());
    }
    if (resLogout && resLogout.status_code !== 200) {
      NotificationError(t("notification"), resLogout.message);
    }
  }, [resLogout]);

  return {
    resChangePassword,
    changePassword,
  };
};

export default useChangePassword;
