import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "../../commons/Notification";
import { getCurrentLanguage } from "../../helper/localStorage";
import { login, resetAuthResponse } from "../../redux/actions/authAction";
import { USER_ROLES } from "../../constants";
import { ERROR, NO_ERROR } from "../../constants/error";
const useLogin = () => {
  const { resLogin } = useSelector((state) => state.authState);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const loginUser = (values) => {
    setLoadingLogin(true);
    dispatch(login(values));
  };
  React.useEffect(() => {
    if (resLogin?.error_code === NO_ERROR) {
      setLoadingLogin(false);
      if (resLogin?.data?.user?.roles?.name === USER_ROLES.ADMIN) {
        navigate(`${lang}/admin`);
      } else if (resLogin?.data?.user?.roles?.name === USER_ROLES.VENDOR) {
        navigate(`${lang}/admin/product-list`);
      } else {
        navigate(`${lang}/media`);
      }
    }
    if (resLogin && resLogin.error_code === ERROR) {
      setLoadingLogin(false);
      NotificationError(t("notification"), resLogin.error_message);
    }
  }, [resLogin]);
  return {
    resLogin,
    loginUser,
    setLoadingLogin,
    loadingLogin,
  };
};

export default useLogin;
