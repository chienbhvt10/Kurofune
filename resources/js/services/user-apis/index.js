import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const userApis = {
  users: async (data) => {
    const url = ROOT_URL + "users";
    return axiosClient.get(url, { params: data });
  },
};
