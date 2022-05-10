import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../services/auth-apis";

const authActions = {
  login: createAction("LOGIN"),
};

export const login = createAsyncThunk(authActions.login, async (payload) => {
  const res = await authApis.login(payload).then((data) => data);
  localStorage.setItem("access_token", res.access_token);
  return res;
});

export default authActions;
