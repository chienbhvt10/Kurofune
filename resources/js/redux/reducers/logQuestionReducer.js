import { createReducer } from "@reduxjs/toolkit";
import {
  getListLogActions,
  exportDetailQuestionCSVLogAction,
  exportAllQuestionCSVLogAction,
} from "../actions/logQuestionAction";

const initialState = {
  listQuestions: "",
  exportDetailLogQuestion: undefined,
  exportAllLogQuestion: undefined,
};

const logQuestionReducer = createReducer(initialState, (builder) => {
  builder.addCase(getListLogActions.fulfilled, (state, actions) => {
    state.listQuestions = actions.payload.data;
  });

  builder.addCase(exportDetailQuestionCSVLogAction.fulfilled, (state, actions) => {
    state.exportLogQuestion = actions.payload;
  });

  builder.addCase(exportAllQuestionCSVLogAction.fulfilled, (state, actions) => {
    state.exportAllLogQuestion = actions.payload;
  });
});

export default logQuestionReducer;
