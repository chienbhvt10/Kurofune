import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LogChatApi } from "../../services/log-chat";
import { orderHistoryApi } from "../../services/order-history";

const orderHistoryAction = {
  getOrderHistory: createAction("GET_ORDER_HISTORY"),
};

export const getOrderHistoryAction = createAsyncThunk(
  orderHistoryAction.getOrderHistory,
  async () => {
    const res = await orderHistoryApi
      .getOrderHistory()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
// export const getDetailChatAction = createAsyncThunk(
//   orderHistoryAction.getDetailChat,
//   async (payload) => {
//     const res = await LogChatApi
//       .getDetailChat(payload)
//       .then((data) => data)
//       .catch((errors) => JSON.parse(errors.response.request.response));
//     return res;
//   }
// );
export default orderHistoryAction;
