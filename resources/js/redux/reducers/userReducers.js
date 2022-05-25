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
  updateUserAction,
} from "../actions/userAction";
const initialState = {
  users: [],
  user: undefined,
  resCreateUser: undefined,
  resUpdateUser: undefined,
  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
};
const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    state.users = actions.payload.data.data;
    state.resUpdateUser = undefined;
    state.resCreateUser = undefined;
    state.total = actions.payload.data.total;
    state.from = actions.payload.data.from;
    state.to = actions.payload.data.to;
    state.current_page = actions.payload.data.current_page;
    state.last_page = actions.payload.data.last_page;
  });
  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    state.user = actions.payload.data;
    state.resUpdateUser = undefined;
    state.resCreateUser = undefined;
  });
  builder.addCase(createUserAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      state.resCreateUser = actions.payload;
      NotificationSuccess("Thông báo", "Tạo mới người dùng thành công");
    } else {
      state.resCreateUser = actions.payload;
      NotificationError("Thông báo", "Tạo mới người dùng thất bại");
    }
  });
  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      state.resUpdateUser = actions.payload;
      NotificationSuccess("Thông báo", "Cập nhật người dùng thành công");
    } else {
      state.resUpdateUser = actions.payload;
      NotificationError("Thông báo", "Cập nhật người dùng thất bại");
    }
  });
  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Xoá người dùng thành công");
    } else {
      NotificationError("Thông báo", "Xoá người dùng thất bại");
    }
  });
});
export default userReducers;
