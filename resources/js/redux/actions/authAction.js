import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../services/auth-apis";

const authActions = {
  login: createAction("LOGIN"),
  forgotPassword: createAction("FORGOT_PASSWORD"),
  resetPassword: createAction("RESET_PASSWORD"),
  resetResponseState: createAction("RESET_RESPONSE_STATE")
};

export const login = createAsyncThunk(authActions.login, async (payload) => {
  const res = await authApis.login(payload).then((data) => data);
  localStorage.setItem("access_token", res.access_token);
  return res;
});

export const forgotPassword = createAsyncThunk(authActions.forgotPassword, async(payload) => {
  const res = authApis.forgotPassword(payload).then(data => {
    if(data.status_code === 200){
      localStorage.setItem("forgot-email", payload);
      return data;
    }
  }).catch(errors => JSON.parse(errors.response.request.response));
  return res;
});

export const resetPassword = createAsyncThunk(authActions.resetPassword, async (payload) => {
  const res = authApis.resetPassword(payload).then(data => {
    if(data.status_code === 200){
      localStorage.removeItem('forgot-email');
      return data;
    }
  }).catch(errors => JSON.parse(errors.response.request.response));
  return res;
});

export const resetResponseState = createAsyncThunk(authActions.resetResponseState, async () => {
  return;
});

export default authActions;
