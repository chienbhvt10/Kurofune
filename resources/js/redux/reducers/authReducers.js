import { createReducer } from "@reduxjs/toolkit";
import { login, forgotPassword, resetPassword } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
  isLogin: false,
  forgotEmail: ""
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
    state.forgotEmail = actions.meta.arg;
  });
  builder.addCase(forgotPassword.rejected, (state, actions) => {
    console.log("We can't find a user with that email address.");
  });
  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    console.log("state reset password", state);
    console.log("actions reset password", actions);
  });
  builder.addCase(resetPassword.rejected, (state, actions) => {
    console.log("This password reset token is invalid.");
  });
});
export default authReducers;
