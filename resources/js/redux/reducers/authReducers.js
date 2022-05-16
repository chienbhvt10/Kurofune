import { createReducer } from "@reduxjs/toolkit";
import { login, forgotPassword, resetPassword, resetResponseState, logout } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
  isLogin: false,
  response: undefined
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    state.userInfo = actions.payload.user;
    state.token = actions.payload.access_token;
    state.isLogin = true;
  });
  
  builder.addCase(forgotPassword.fulfilled, (state, actions) => {
    state.response = actions.payload;
  });
  
  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    state.response = actions.payload;
  });
  
  builder.addCase(resetResponseState.fulfilled, (state, actions) => {
    state.response = undefined;
  });

  builder.addCase(logout.fulfilled, (state, actions) => {
    console.log("state", state);
    console.log("actions", actions);
  });

});
export default authReducers;
