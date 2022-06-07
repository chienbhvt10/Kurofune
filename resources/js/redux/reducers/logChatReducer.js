import { createReducer } from "@reduxjs/toolkit";
import { getListChatAction, getDetailChatAction } from "../actions/logChatAction";

const initialState = {
  listChat: undefined,
  detailChat: undefined,
};

const logChatReducer = createReducer(initialState, (builder) => {
  builder.addCase(getListChatAction.fulfilled, (state, actions) => {
    state.listChat = actions.payload.data;
  });
  builder.addCase(getDetailChatAction.fulfilled, (state, actions) => {
    state.detailChat = actions.payload.data;
  });
});

export default logChatReducer;
