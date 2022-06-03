import { USER_ROLES } from "../constants/index";
export const isAdmin = (roles) => {
  return roles && Array.isArray(roles)
    ? roles.map((item) => item.name).some((item) => USER_ROLES.ADMIN === item)
    : roles === USER_ROLES.ADMIN;
};

export const isVendor = (roles) => {
  return roles && Array.isArray(roles)
    ? roles.map((item) => item.name).some((item) => USER_ROLES.VENDOR === item)
    : roles === USER_ROLES.VENDOR;
};
