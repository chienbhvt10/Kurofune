import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LogChatApi } from "../../services/log-chat";
import { orderHistoryApi } from "../../services/order-history";

const orderHistoryAction = {
  getOrderHistory: createAction("GET_ORDER_HISTORY"),
  getOrderHistoryDetail: createAction("GET_ORDER_HISTORY_DETAIL"),
};

export const getOrderHistoryAction = createAsyncThunk(
  orderHistoryAction.getOrderHistory,
  async (payload) => {
    const res = await orderHistoryApi
      .getOrderHistory(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const getOrderHistoryDetailAction = createAsyncThunk(
  orderHistoryAction.getOrderHistoryDetail,
  async (payload) => {
    const res = await orderHistoryApi
      .getOrderHistoryDetail(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export default orderHistoryAction;
