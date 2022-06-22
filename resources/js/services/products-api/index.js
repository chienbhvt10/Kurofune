import { ROOT_URL } from "../../constants/api";
import axiosClient, { axiosFormData } from "../api-caller";

export const productsApis = {
  products: async (payload) => {
    const url = ROOT_URL + "products";
    return await axiosClient.get(url, { params: payload });
  },
  product: async (id) => {
    const url = ROOT_URL + "products";
    return await axiosClient.get(`${url}/${id}`);
  },

  createProduct: async (payload) => {
    const url = ROOT_URL + "products";
    return await axiosFormData.post(url, payload);
  },

  updateProduct: async (payload) => {
    const url = ROOT_URL + "products";
    return await axiosFormData.post(`${url}/${payload.get("id")}`, payload);
  },

  deleteProduct: async (id) => {
    const url = ROOT_URL + "products";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
