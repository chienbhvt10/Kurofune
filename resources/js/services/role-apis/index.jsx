import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const roleApis = {
  roles: async (data) => {
    const url = ROOT_URL + "roles";
    return axiosClient.get(url, data);
  },
};
