import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage";
import AccessDenied from "../../commons/AccessDenied";
const PrivateRoute = ({ children, roles }) => {
  console.log(roles);
  const { isLogin, userInfo, profile, isLoading } = useSelector(
    (state) => state.authState
  );
  const lang = getCurrentLanguage();
  let location = useLocation();
  const currentUserRole = roles
    ? profile?.roles.map((item) => item.name) || [userInfo?.roles?.name]
    : [];
  const userHasRequiredRole = roles?.some((item) =>
    currentUserRole.includes(item)
  );
  return (
    !isLoading &&
    (isLogin ? (
      !roles || userHasRequiredRole ? (
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
