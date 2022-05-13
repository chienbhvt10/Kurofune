import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const authApis = {
  login: async (data) => {
    const url = ROOT_URL + "login";
    return axiosClient.post(url, data);
  },
  forgotPassword: async (data) => {
    const url = ROOT_URL + "forgot-password";
    return axiosClient.post(url, { email: data });
  },
  resetPassword: async (data) => {
    const url = ROOT_URL + "reset-password";
    return axiosClient.post(url, data);
  }
};
