import { createReducer } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
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
  response: undefined,
};
const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    state.users = actions.payload.data.data;
  });
  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    state.user = actions.payload.data;
  });
  builder.addCase(createUserAction.fulfilled, (state, actions) => {
    if (actions.payload.data) {
      state.response = actions.payload;
    } else {
      state.response = actions.payload;
    }
  });
  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    if (actions.payload.data) {
      state.response = actions.payload;
    } else {
      state.response = actions.payload;
    }
  });
  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    state.users = state.users.filter(
      (item, index) => item.id !== actions.payload
    );
  });
});
export default userReducers;
