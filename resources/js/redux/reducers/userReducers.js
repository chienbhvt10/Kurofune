import { createReducer } from "@reduxjs/toolkit";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  createUserAction,
  deleteUserAction,
  getUserAction,
  getUsersAction,
  resetResCRUDAction,
  updateUserAction,
} from "../actions/userAction";

const initialState = {
  users: [],
  user: undefined,
  resCreateUser: undefined,
  resUpdateUser: undefined,
  resDeleteUser: undefined,
  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
};

const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    return {
      ...state,
      users: actions.payload.data.data,
      total: actions.payload.data.total,
      from: actions.payload.data.from,
      to: actions.payload.data.to,
      current_page: actions.payload.data.current_page,
      last_page: actions.payload.data.last_page,
    };
  });

  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      user: actions.payload.data,
    };
  });

  builder.addCase(createUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateUser: actions.payload,
    };
  });

  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateUser: actions.payload,
    };
  });

  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resDeleteUser: actions.payload,
    };
  });

  builder.addCase(resetResCRUDAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateUser: undefined,
      resUpdateUser: undefined,
      resDeleteUser: undefined,
    };
  });
});
export default userReducers;
