import { createReducer } from "@reduxjs/toolkit";
import {
  exportAllQuestionCSVLogAction,
  exportDetailQuestionCSVLogAction,
} from "../actions/exportCsvAction.js";
import { getListLogActions } from "../actions/logQuestionAction";

const initialState = {
  listQuestions: "",
  csvDetailLog: undefined,
  csvAllLog: undefined,
};

const logQuestionReducer = createReducer(initialState, (builder) => {
  builder.addCase(getListLogActions.fulfilled, (state, actions) => {
    state.listQuestions = actions.payload.data;
  });

  builder.addCase(
    exportDetailQuestionCSVLogAction.fulfilled,
    (state, actions) => {
      state.csvDetailLog = actions.payload;
    }
  );

  builder.addCase(exportAllQuestionCSVLogAction.fulfilled, (state, actions) => {
    state.csvAllLog = actions.payload;
  });
});

export default logQuestionReducer;
