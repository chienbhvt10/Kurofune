import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage";
import AccessDenied from "../../commons/AccessDenied";
import { USER_ROLES } from "../../constants";
const PrivateRoute = ({ children, roles }) => {
  const { isLogin, userInfo, profile, isLoading } = useSelector(
    (state) => state.authState
  );
  const lang = getCurrentLanguage();
  let location = useLocation();
  const currentUserRole = profile?.roles.map((item) => item.name) || [
    userInfo?.roles?.name,
  ];
  const userHasRequiredRole = roles?.some((item) =>
    currentUserRole.includes(item)
  );
  const isNormalUser = !currentUserRole.some((item) =>
    [USER_ROLES.ADMIN, USER_ROLES.VENDOR].includes(item)
  );
  return (
    !isLoading &&
    (isLogin ? (
      (!roles && isNormalUser) || userHasRequiredRole ? (
        children
      ) : (
        <AccessDenied />
      )
    ) : (
      <Navigate to={`${lang}/login`} state={{ from: location }} />
    ))
  );
};

export default PrivateRoute;
