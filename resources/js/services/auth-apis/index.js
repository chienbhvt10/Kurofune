import { ROOT_URL } from "../../constants/api";
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
    const jwtToken = localStorage.getItem("access_token");
    if(jwtToken){
      return true;
    }else{
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
};
