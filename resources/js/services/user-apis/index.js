import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const userApis = {
  users: async (data) => {
    const url = ROOT_URL + "users";
    return axiosClient.get(url, data);
  },
  user: async (data) => {
    const url = ROOT_URL + `users/${data}`;
    return axiosClient.get(url);
  },
  createUser: async (data) => {
    const url = ROOT_URL + "users";
    return axiosClient.post(url, data);
  },
  updateUser: async (data) => {
    const url = ROOT_URL + `users/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteUser: async (data) => {
    const url = ROOT_URL + "users";
    return axiosClient.delete(url, data);
  },
};
