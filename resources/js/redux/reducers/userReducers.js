import { createReducer } from "@reduxjs/toolkit";
import {
  createUserAction,
  getUserAction,
  getUsersAction,
  updateUserAction,
} from "../actions/userAction";
const initialState = {
  users: [],
  user: undefined,
};

const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    state.users = actions.payload.data.data;
  });
  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    state.user = actions.payload.data;
  });
  builder.addCase(createUserAction.fulfilled, (state, actions) => {
    state.users = [...state.user, actions.payload.data];
  });
  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    state.users = [...state.user, actions.payload.data];
  });
});
export default userReducers;
