import { ROOT_URL } from "../../constants/api";
import axiosClient, { axiosFormData } from "../api-caller";

export const userApis = {
  users: async (data) => {
    let url = ROOT_URL + "users";
    return await axiosClient.get(url, { params: data });
  },
  user: async (data) => {
    const url = ROOT_URL + `users/${data}`;
    return await axiosClient.get(url);
  },
  createUser: async (data) => {
    const url = ROOT_URL + "users";
    return await axiosFormData.post(url, data);
  },
  updateUser: async (data) => {
    const url = ROOT_URL + `users/${data.get("id")}`;
    return await axiosFormData.post(url, data);
  },
  deleteUser: async (data) => {
    const url = ROOT_URL + `users/${data}`;
    return await axiosClient.delete(url);
  },
};
