import { createReducer } from "@reduxjs/toolkit";
import { getUser, users } from "../actions/userAction";
const initialState = {
  users: [],
  user: undefined,
};

const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(users.fulfilled, (state, actions) => {
    console.log(actions.payload.data.data);
    state.users = actions.payload.data.data;
  });
  builder.addCase(getUser.fulfilled, (state, actions) => {
    state.user = actions.payload;
  });
});
export default userReducers;
