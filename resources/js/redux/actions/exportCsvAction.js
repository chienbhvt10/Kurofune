import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { downloadBlob } from "../../helper/handler";
import { LogChatApi } from "../../services/log-chat";
import { logQuestionApi } from "../../services/log-question-apis/index.js";
import { userApis } from "../../services/user-apis";

const ExportCsvAction = {
  exportCsvUser: createAction("EXPORT_CSV_USER"),
  exportCsvAll: createAction("EXPORT_CSV_ALL"),

  exportDetailLogQuestionCSV: createAction("EXPORT_DETAIL_QUESTION_CSV"),
  exportAllLogQuestionCSV: createAction("EXPORT_ALL_QUESTION_CSV"),
};

export const exportCsvUserAction = createAsyncThunk(
  ExportCsvAction.exportCsvUser,
  async (payload) => {
    const res = await LogChatApi.exportCsvUser(payload)
      .then((data) => {
        const dateExported = new Date();
        const fileName = `${
          payload ? "User" + payload.id + "_" : ""
        }chat_log_export_${dateExported.toISOString().split("T")[0]}.csv`;

        downloadBlob(data, fileName);
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const exportCsvAllAction = createAsyncThunk(
  ExportCsvAction.exportCsvAll,
  async (payload) => {
    const res = await LogChatApi.exportCsvAll(payload)
      .then((data) => {
        const dateExported = new Date();
        const fileName = `User_chat_log_export_${
          dateExported.toISOString().split("T")[0]
        }.csv`;

        downloadBlob(data, fileName);
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const exportDetailQuestionCSVLogAction = createAsyncThunk(
  ExportCsvAction.exportDetailLogQuestionCSV,
  async (payload) => {
    const res = await logQuestionApi
      .exportDetailLogQuestionCSV(payload)
      .then((data) => {
         const dateExported = new Date();
          const fileName = `${
            payload ? "Log_Question_" + payload : "Log_Question"
          }_export_${dateExported.toISOString().split("T")[0]}.csv`;

          downloadBlob(data, fileName);
          return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const exportAllQuestionCSVLogAction = createAsyncThunk(
  ExportCsvAction.exportAllLogQuestionCSV,
  async () => {
    const res = await logQuestionApi
      .exportAlllLogQuestionCSV()
      .then((data) => {
         const dateExported = new Date();
         const fileName = `All_Log_Questionaire_export_${
           dateExported.toISOString().split("T")[0]
         }.csv`;

         downloadBlob(data, fileName);
         return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export default ExportCsvAction;
