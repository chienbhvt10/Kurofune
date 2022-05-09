import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../services/auth-apis";

const authActions = {
  login: createAction("LOGIN"),
};

export const login = createAsyncThunk(authActions.login, async (payload) => {
  const res = await authApis.login(payload).then((data) => data);
  return res;
});

export default authActions;
