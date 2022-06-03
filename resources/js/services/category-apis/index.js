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

  // Admin
  categoryAdmin: async (id) => {
    const url = ROOT_URL + `categories/${id}`;
    return await axiosClient.get(url);
  },

  createAdminCategory: async (data) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.post(url, data);
  },

  updateAdminCategory: async (data) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.put(`${url}/${data.id}`, data);
  },

  deleteAdminCategory: async (id) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
