import { createReducer } from "@reduxjs/toolkit";
import {
  createUserAction,
  deleteUserAction,
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
    state.users = [...state.users, actions.payload.data];
  });
  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    //notification
  });
  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    state.users = state.users.filter(
      (item, index) => item.id !== actions.payload
    );
  });
});
export default userReducers;
