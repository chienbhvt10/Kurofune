import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  USER_ROLES,
} from "../constants/index";
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

export const isRoleMember = (role) => {
  return (
    role === ROLE_VENDOR ||
    role === ROLE_LIGHT_PLAN ||
    role === ROLE_FULL_SUPPORT_PLAN
  );
};

export const isRolePlan = (role) => {
  return role === ROLE_LIGHT_PLAN || role === ROLE_FULL_SUPPORT_PLAN;
};
export const isRoleVendor = (role) => {
  return role === ROLE_VENDOR;
};
