import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const categoryApis = {
  categories: async (data) => {
    const url = ROOT_URL + "list-category";
    return await axiosClient.get(url, data);
  },
  category: async (data) => {
    const url = ROOT_URL + `detail-category/${data}`;
    return await axiosClient.get(url);
  },
};
