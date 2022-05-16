import { createReducer } from "@reduxjs/toolkit";
import { login, forgotPassword, resetPassword, resetResponseState } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
  isLogin: false,
  response: {}
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
    state.response = actions.payload;
  });
  builder.addCase(forgotPassword.rejected, (state, actions) => {
    console.log("actions forgot password", actions);
    console.log("state forgot password", state);
  });
  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    state.response = actions.payload;
  });
  builder.addCase(resetPassword.rejected, (state, actions) => {
    console.log("actions reset password", actions);
    console.log("state reset password", state);
  });
  builder.addCase(resetResponseState.fulfilled, (state, actions) => {
    state.response = actions.payload;
  });
});
export default authReducers;
