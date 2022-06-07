import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const LogChatApi = {
  getListChat: async (data) => {
    const url = ROOT_URL + "list-chat-log";
    return await axiosClient.get(url);
  },
  getDetailChat: async (data) => {
    const url = ROOT_URL + `detail-chat-log/${data}`;
    return await axiosClient.get(url);
  },
};
