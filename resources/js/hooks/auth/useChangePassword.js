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
import { ERROR, NO_ERROR } from "../../constants/error";

const useChangePassword = () => {
  const { resChangePassword } = useSelector((state) => state.authState);
  const [loadingChangePassword, setLoadingChangePassword] = React.useState();
  const { getLogout, resLogout } = useLogout();
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();

  const changePassword = (payload) => {
    setLoadingChangePassword(true);
    dispatch(changePasswordAction(payload));
  };

  React.useEffect(() => {
    if (resChangePassword?.error_code === NO_ERROR) {
      setLoadingChangePassword(false);
      NotificationSuccess(t("notification"), resChangePassword.message);
      getLogout();
      dispatch(resetAuthResponse());
    }
    if (resChangePassword && resChangePassword.error_code === ERROR) {
      setLoadingChangePassword(false);
      NotificationError(t("notification"), resChangePassword.error_message);
    }
  }, [resChangePassword]);

  React.useEffect(() => {
    if (
      resLogout?.error_code === NO_ERROR &&
      resChangePassword?.error_code === NO_ERROR
    ) {
      NotificationSuccess(t("notification"), resLogout.message);
      navigate(`${lang}/login`);
      dispatch(resetAuthResponse());
    }
    if (resLogout && resLogout.error_code === ERROR) {
      NotificationError(t("notification"), resLogout.error_message);
    }
  }, [resLogout]);

  return {
    resChangePassword,
    changePassword,
    loadingChangePassword,
    setLoadingChangePassword,
  };
};

export default useChangePassword;
