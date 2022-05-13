import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../services/auth-apis";

const authActions = {
  login: createAction("LOGIN"),
  forgotPassword: createAction("FORGOT_PASSWORD"),
  resetPassword: createAction("RESET_PASSWORD")
};

export const login = createAsyncThunk(authActions.login, async (payload) => {
  const res = await authApis.login(payload).then((data) => data);
  localStorage.setItem("access_token", res.access_token);
  return res;
});

export const forgotPassword = createAsyncThunk(authActions.forgotPassword, async(payload) => {
  const res = authApis.forgotPassword(payload).then(data => data);
  return res; 
});

export const resetPassword = createAsyncThunk(authActions.resetPassword, async (payload) => {
  const res = authApis.resetPassword(payload).then(data => data);
  return res;
})

export default authActions;
