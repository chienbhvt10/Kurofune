import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LogChatApi } from "../../services/log-chat";

const ExportCsvAction = {
  exportCsvUser: createAction("EXPORT_CSV_USER"),
  exportCsvAll: createAction("EXPORT_CSV_ALL"),
};

export const exportCsvUserAction = createAsyncThunk(
  ExportCsvAction.exportCsvUser,
  async (payload) => {
    const res = await LogChatApi
      .exportCsvUser(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const exportCsvAllAction = createAsyncThunk(
  ExportCsvAction.exportCsvAll,
  async (payload) => {
    const res = await LogChatApi
      .exportCsvAll(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export default ExportCsvAction;
