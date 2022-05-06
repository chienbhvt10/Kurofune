import { createReducer } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";
const initialState = {
  userInfo: {},
  token: "",
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    state.userInfo = actions.payload.user;
    state.token = actions.payload.access_token;
    localStorage.setItem("access_token", state.token);
  });
});
export default authReducers;
