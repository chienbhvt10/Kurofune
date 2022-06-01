import {
  ACCESS_TOKEN_STORE,
  CURRENT_LANG_STORED,
  RESET_MAIL_STORED,
} from "../constants";

export const setCurrentLanguage = (lang) => {
  return localStorage.setItem(CURRENT_LANG_STORED, lang);
};
export const getCurrentLanguage = () => {
  return localStorage.getItem(CURRENT_LANG_STORED);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_STORE);
};
export const setAccessToken = (access_token) => {
  return localStorage.setItem(ACCESS_TOKEN_STORE, access_token);
};
export const removeAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN_STORE);
};

export const getResetMail = () => {
  return localStorage.getItem(RESET_MAIL_STORED);
};
export const removeResetMail = () => {
  localStorage.removeItem(RESET_MAIL_STORED);
};

export const setResetMail = (reset_email) => {
  return localStorage.setItem(RESET_MAIL_STORED, reset_email);
};
