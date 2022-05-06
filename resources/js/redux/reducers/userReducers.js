import { createReducer } from "@reduxjs/toolkit";
import { getUser, getUsers } from "../actions/userAction";
const initialState = {
  users: [],
  user: {},
};

const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.fulfilled, (state, actions) => {
    state.users = actions.payload;
  });
  builder.addCase(getUser.fulfilled, (state, actions) => {
    state.user = actions.payload;
  });
});
export default userReducers;
