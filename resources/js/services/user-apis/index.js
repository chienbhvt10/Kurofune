import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const userApis = {
  users: async (data) => {
    const url = ROOT_URL + "users";
    return await axiosClient.get(url, data);
  },
  user: async (data) => {
    const url = ROOT_URL + `users/${data}`;
    return await axiosClient.get(url);
  },
  createUser: async (data) => {
    const url = ROOT_URL + "users";
    return await axiosClient.post(url, data);
  },
  updateUser: async (data) => {
    const url = ROOT_URL + `users/${data.id}`;
    return await axiosClient.put(url, data);
  },
  deleteUser: async (data) => {
    const url = ROOT_URL + `users/${data}`;
    return await axiosClient.delete(url);
  },
};
