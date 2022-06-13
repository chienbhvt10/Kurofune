import { ROOT_URL } from "../../constants/api";
import { getAccessToken } from "../../helper/localStorage";
import axiosClient from "../api-caller";

export const authApis = {
  login: async (data) => {
    const url = ROOT_URL + "login";
    return await axiosClient.post(url, data);
  },
  logout: async () => {
    const url = ROOT_URL + "logout";
    return axiosClient.post(url);
  },
  checkLogin: () => {
    const jwtToken = getAccessToken();
    if (jwtToken) {
      return true;
    } else {
      return false;
    }
  },
  forgotPassword: async (data) => {
    const url = ROOT_URL + "forgot-password";
    return await axiosClient.post(url, { email: data });
  },
  resetPassword: async (data) => {
    const url = ROOT_URL + "reset-password";
    return await axiosClient.post(url, data);
  },
  showProfile: async () => {
    const url = ROOT_URL + `profile`;
    return await axiosClient.get(url);
  },
  changePassword: async (data) => {
    const url = ROOT_URL + `change-password`;
    return await axiosClient.put(url, data);
  },
  updateProfile: async (data) => {
    const url = ROOT_URL + `user-address`;
    return await axiosClient.put(url, data);
  },
  updateBillingAddress: async (data) => {
    const url = ROOT_URL + `billing-address`;
    return await axiosClient.put(url, data);
  },
  updateShippingAddress: async (data) => {
    const url = ROOT_URL + `shipping-address`;
    return await axiosClient.put(url, data);
  },
};
