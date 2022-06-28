import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { downloadBlob } from "../../helper/handler";
import { LogChatApi } from "../../services/log-chat";
import { userApis } from "../../services/user-apis";

const ExportCsvAction = {
  exportCsvUser: createAction("EXPORT_CSV_USER"),
  exportCsvAll: createAction("EXPORT_CSV_ALL"),
};

export const exportCsvUserAction = createAsyncThunk(
  ExportCsvAction.exportCsvUser,
  async (payload) => {
    const res = await LogChatApi.exportCsvUser(payload)
      .then((data) => {
        const dateExported = new Date();
        const fileName = `${
          payload.id ? "User" + payload.id + "_" : ""
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

export default ExportCsvAction;
