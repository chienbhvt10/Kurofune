import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LogChatApi } from "../../services/log-chat";

const logChatAction = {
  getListChat: createAction("GET_LIST_CHAT"),
  getDetailChat: createAction("GET_DETAIL_CHAT"),
};

export const getListChatAction = createAsyncThunk(
  logChatAction.getListChat,
  async (payload) => {
    const res = await LogChatApi
      .getListChat()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const getDetailChatAction = createAsyncThunk(
  logChatAction.getDetailChat,
  async (payload) => {
    const res = await LogChatApi
      .getDetailChat(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export default logChatAction;
