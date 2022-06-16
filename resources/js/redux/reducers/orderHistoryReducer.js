import { createReducer } from "@reduxjs/toolkit";
import { getOrderHistoryAction } from "../actions/orderHistoryAction";

const initialState = {
  orderHistory: undefined,
};

const orderHistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrderHistoryAction.fulfilled, (state, actions) => {
      state.orderHistory = actions.payload.data;
    })
    // .addCase(getDetailChatAction.fulfilled, (state, actions) => {
    //   state.detailChat = actions.payload.data;
    // });
});

export default orderHistoryReducer;
