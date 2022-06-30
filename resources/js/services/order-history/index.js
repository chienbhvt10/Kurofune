import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const orderHistoryApi = {
  getOrderHistory: async (req) => {
    const url = ROOT_URL + "order-history";
    return await axiosClient.get(url,{params:req});
  },
  getOrderHistoryDetail: async (data) => {
    const url = ROOT_URL + `order-history-detail/${data}`;
    return await axiosClient.get(url);
  }
};
