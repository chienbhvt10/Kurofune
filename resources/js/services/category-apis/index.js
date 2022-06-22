import { ROOT_URL } from "../../constants/api";
import axiosClient, { axiosFormData } from "../api-caller";

export const categoryApis = {
  categories: async (data) => {
    const url = ROOT_URL + "list-category";
    return await axiosClient.get(url, data);
  },

  categoriesAdmin: async (data) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.get(url, { params: data });
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
    return await axiosFormData.post(url, data);
  },

  updateAdminCategory: async (data) => {
    const url = ROOT_URL + `categories/${data.get("id")}`;
    return await axiosFormData.post(url, data);
  },

  deleteAdminCategory: async (id) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
