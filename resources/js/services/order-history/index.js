import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const orderHistoryApi = {
  getOrderHistory: async () => {
    const url = ROOT_URL + "order-history";
    return await axiosClient.get(url);
  },
  // getDetailChat: async (data) => {
  //   const url = ROOT_URL + `detail-chat-log/${data}`;
  //   return await axiosClient.get(url);
  // }
};
