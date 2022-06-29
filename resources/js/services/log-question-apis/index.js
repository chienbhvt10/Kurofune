import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const logQuestionApi = {
  getListQuestions: async () => {
    const url = ROOT_URL + "list-log-question";
    return await axiosClient.get(url);
  },

  exportDetailLogQuestionCSV: async (data) => {
    const url = ROOT_URL + "export-log-question";
    return await axiosClient.get(url, {
      params: { order_id: data },
    });
  },

  exportAlllLogQuestionCSV: async () => {
    const url = ROOT_URL + "export-log-question";
    return await axiosClient.get(url, {
      params: { export: "all" },
    });
  },
};
