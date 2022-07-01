import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const orderAdminAPI = {
  getListOrderAdmin: async (data) => {
    const url = ROOT_URL + "orders";
    return await axiosClient.get(url,{ params: data });
  },
  getListOrderAdminNotData: async () => {
    const url = ROOT_URL + "orders";
    return await axiosClient.get(url);
  },
  getOrderDetailAdmin: async (id) => {
    const url = ROOT_URL + `orders/${id}`;
    return await axiosClient.get(url);
  },
 updateOrderAdmin: async (id,data) => {
    const url = ROOT_URL + `orders/${id}`;
    return await axiosClient.put(url,data);
  },
   deleteOrderAdmin: async (id) => {
    const url = ROOT_URL + `orders/${id}`;
    return await axiosClient.delete(url);
  },
};
