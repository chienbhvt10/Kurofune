import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const categoryApis = {
  categories: async (data) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.get(url, data);
  },
  category: async (data) => {
    const url = ROOT_URL + `detail-category/${data}`;
    return await axiosClient.get(url);
  },

  // Admin
  categoryAdmin: async (id) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.get(`${url}/${id}`);
  },

  createAdminCategory: async (payload) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.post(url, payload);
  },

  updateAdminCategory: async (payload) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.put(`${url}/${payload.id}`, payload);
  },

  deleteAdminCategory: async (id) => {
    const url = ROOT_URL + "categories";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
