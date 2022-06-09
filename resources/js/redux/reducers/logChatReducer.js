import { createReducer } from "@reduxjs/toolkit";
import { exportCsvAllAction,exportCsvUserAction} from "../actions/exportCsvAction";
import { getDetailChatAction, getListChatAction } from "../actions/logChatAction";

const initialState = {
  listChat: undefined,
  detailChat: undefined,
  csvUser:undefined,
  csvAllUser:undefined
};

const logChatReducer = createReducer(initialState, (builder) => {
  builder.addCase(getListChatAction.fulfilled, (state, actions) => {
    state.listChat = actions.payload.data;
  });
  builder.addCase(getDetailChatAction.fulfilled, (state, actions) => {
    state.detailChat = actions.payload.data;
  });
  builder.addCase(exportCsvUserAction.fulfilled, (state, actions) => {
    state.csvUser = actions.payload.data;
  });
  builder.addCase(exportCsvAllAction.fulfilled, (state, actions) => {
    state.csvAllUser = actions.payload.data;
  });
});

export default logChatReducer;
