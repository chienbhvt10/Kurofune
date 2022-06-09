import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const LogChatApi = {
  getListChat: async () => {
    const url = ROOT_URL + "list-chat-log";
    return await axiosClient.get(url);
  },
  getDetailChat: async (data) => {
    const url = ROOT_URL + `detail-chat-log/${data}`;
    return await axiosClient.get(url);
  },
 exportCsvAll: async (data) => {
    const url = ROOT_URL + "export-chat-log-all";
    return await axiosClient.get(url,{ params: { export_ja : data.export_ja } });
  },
   exportCsvUser: async ({id,export_ja}) => {
     console.log({id,export_ja});
    const url = ROOT_URL + `export-chat-log-user/${id}`;
    return await axiosClient.get(url,{ params: { export_ja } });
  },
};
