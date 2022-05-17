import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { userApis } from "../../services/user-apis";

const userActions = {
  showProfile: createAction("SHOW_PROFILE"),
  getUsers: createAction("GET_USERS"),
  getUser: createAction("GET_USER"),
  createUser: createAction("CREATE_USER"),
  updateUser: createAction("UPDATE_USER"),
  deleteUser: createAction("DELETE_USER"),
  changePassword: createAction("CHANGE_PASSWORD"),
};

export const getUsersAction = createAsyncThunk(
  userActions.getUsers,
  async (payload) => {
    const res = await userApis.users().then((data) => data);
    return res;
  }
);
export const getUserAction = createAsyncThunk(
  userActions.getUser,
  async (payload) => {
    const res = await userApis.user(payload).then((data) => data);
    return res;
  }
);
export const createUserAction = createAsyncThunk(
  userActions.createUser,
  async (payload) => {
    const res = await userApis
      .createUser(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const updateUserAction = createAsyncThunk(
  userActions.updateUser,
  async (payload) => {
    const res = await userApis
      .updateUser(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const deleteUserAction = createAsyncThunk(
  userActions.deleteUser,
  async (payload) => {
    const res = await userApis.deleteUser(payload).then((data) => data);
    return payload;
  }
);

export const showProfileAction = createAsyncThunk(
  userActions.showProfile,
  async (payload) => {
    const res = await userApis
      .showProfile(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const changePasswordAction = createAsyncThunk(
  userActions.changePassword,
  async (payload) => {
    const res = await userApis
      .changePassword(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export default userActions;
