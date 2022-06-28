import { createReducer } from "@reduxjs/toolkit";
import { getOrderHistoryAction, getOrderHistoryDetailAction } from "../actions/orderHistoryAction";

const initialState = {
  orderHistory: undefined,
  orderHistoryDetail: undefined,
};

const orderHistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOrderHistoryAction.fulfilled, (state, actions) => {
      state.orderHistory = actions.payload.data;
    })
    .addCase(getOrderHistoryDetailAction.fulfilled, (state, actions) => {
      state.orderHistoryDetail = actions.payload.data;
    });
});

export default orderHistoryReducer;
