import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../../services/user-apis";

const userActions = {
  getUsers: createAction("GET_USERS"),
  getUser: createAction("GET_USER"),
};

export const users = createAsyncThunk(userActions.getUsers, async (payload) => {
  const res = await userApis.users().then((data) => data);
  return res;
});
export const getUser = createAsyncThunk(
  userActions.getUser,
  async (payload) => {
    //fetch api
    return { hello: "hello", firstname: "aaaa", payload: payload };
  }
);
export default userActions;
