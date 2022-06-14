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
      .then((data) => {
        downloadBlob(data, payload.id);
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const exportCsvAllAction = createAsyncThunk(
  ExportCsvAction.exportCsvAll,
  async (payload) => {
    const res = await LogChatApi
      .exportCsvAll(payload)
      .then((data) => {
        downloadBlob(data);
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
const downloadBlob = (content, idUser) => {
  const dateExported = new Date();
  const BOM = "\uFEFF";
  content = BOM + content;
  const blob = new Blob([content], { type: "data:text/csv;charset=utf-8," });
  const url = URL.createObjectURL(blob);
  let dow = document.createElement("a");
  dow.href = url;
  const fileName = `${idUser ? "User" + idUser + "_" : ""}chat_log_export_${
    dateExported.toISOString().split("T")[0]
  }.csv`;
  dow.setAttribute("download", fileName);
  dow.click();
};
export default ExportCsvAction;
