import { createReducer } from "@reduxjs/toolkit";
import { login, forgotPassword, resetPassword } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
  isLogin: false,
  errorMessages: undefined
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    state.userInfo = actions.payload.user;
    state.token = actions.payload.access_token;
    state.isLogin = true;
  });
  builder.addCase(login.rejected, (state, actions) => {
    console.log("Reject Action");
  });
  builder.addCase(forgotPassword.fulfilled, (state, actions) => {
    state.errorMessages = actions.payload;
  });
  builder.addCase(forgotPassword.rejected, (state, actions) => {
    console.log("state", state);
  });
  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    state.errorMessages = actions.payload;
  });
  builder.addCase(resetPassword.rejected, (state, actions) => {
    console.log("state", state);
  });
});
export default authReducers;
