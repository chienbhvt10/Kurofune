import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const userActions = {
  getUsers: createAction("GET_USERS"),
  getUser: createAction("GET_USER"),
};

export const getUsers = createAsyncThunk(
  userActions.getUsers,
  async (payload) => {
    //fetch api
    return [{ hello: "hello", firstname: "aaaa", payload: payload }];
  }
);
export const getUser = createAsyncThunk(
  userActions.getUser,
  async (payload) => {
    //fetch api
    return { hello: "hello", firstname: "aaaa", payload: payload };
  }
);
export default userActions;
