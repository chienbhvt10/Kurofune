import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const productsApis = {
  products: async () => {
    const url = ROOT_URL + "products";
    return await axiosClient.get(url);
  },
  product: async (id) => {
    const url = ROOT_URL + "products";
    return await axiosClient.get(`${url}/${id}`);
  },

  createProduct: async (payload) => {
    const url = ROOT_URL + "products";
    return await axiosClient.post(url, payload);
  },

  updateProduct: async (payload) => {
    const url = ROOT_URL + "products";
    return await axiosClient.put(`${url}/${payload.id}`, payload);
  },

  deleteProduct: async (id) => {
    const url = ROOT_URL + "products";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
