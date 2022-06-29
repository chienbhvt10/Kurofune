import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {logQuestionApi} from "../../services/log-question-apis"

const logQuestionAction = {
  getListQuestions: createAction("GET_LIST_QUESTION"),
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

export default logQuestionAction;
