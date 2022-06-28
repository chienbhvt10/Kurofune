import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {logQuestionApi} from "../../services/log-question-apis"

const logQuestionAction = {
  getListQuestions: createAction("GET_LIST_QUESTION"),
  exportDetailLogQuestionCSV: createAction("EXPORT_DETAIL_QUESTION_CSV"),
  exportAllLogQuestionCSV: createAction("EXPORT_ALL_QUESTION_CSV"),
};

export const getListLogActions = createAsyncThunk(
  logQuestionAction.getListQuestions,
  async (payload) => {
    const res = await logQuestionApi
      .getListQuestions()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const exportDetailQuestionCSVLogAction = createAsyncThunk(
  logQuestionAction.exportDetailLogQuestionCSV,
  async (payload) => {
    const res = await logQuestionApi
      .exportDetailLogQuestionCSV(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const exportAllQuestionCSVLogAction = createAsyncThunk(
  logQuestionAction.exportAllLogQuestionCSV,
  async (payload) => {
    const res = await logQuestionApi
      .exportAlllLogQuestionCSV(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export default logQuestionAction;
