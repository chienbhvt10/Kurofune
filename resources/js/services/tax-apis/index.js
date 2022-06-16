import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const taxApis = {
  taxes: async (data) => {
    const url = ROOT_URL + "taxes";
    return await axiosClient.get(url, { params: data });
  },
  tax: async (id) => {
    const url = ROOT_URL + "taxes";
    return await axiosClient.get(`${url}/${id}`);
  },
  addTax: async (data) => {
    const url = ROOT_URL + "taxes";
    return await axiosClient.post(url, data);
  },
  updateTax: async (data) => {
    const url = ROOT_URL + "taxes";
    return await axiosClient.put(`${url}/${data.id}`, data);
  },
  deleteTax: async (id) => {
    const url = ROOT_URL + "taxes";
    return await axiosClient.delete(`${url}/${id}`);
  },
};
