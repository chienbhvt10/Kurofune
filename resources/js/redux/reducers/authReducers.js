import { createReducer } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
  isLogin: false,
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
});
export default authReducers;
