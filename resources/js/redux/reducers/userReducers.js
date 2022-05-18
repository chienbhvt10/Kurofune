import { createReducer } from "@reduxjs/toolkit";
import { NotificationSuccess } from "../../commons/Notification";
import {
  changePasswordAction,
  createUserAction,
  deleteUserAction,
  getUserAction,
  getUsersAction,
  showProfileAction,
  updateUserAction,
} from "../actions/userAction";
const initialState = {
  users: [],
  user: undefined,
  response: undefined,
  profile: undefined,
};
const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    state.users = actions.payload.data.data;
    state.response = undefined;
  });
  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    state.user = actions.payload.data;
    state.response = undefined;
  });
  builder.addCase(createUserAction.fulfilled, (state, actions) => {
    if (actions.payload.data) {
      state.response = actions.payload;
      NotificationSuccess("Thông báo", "Tạo mới người dùng thành công");
    } else {
      state.response = actions.payload;
      NotificationSuccess("Thông báo", "Tạo mới người dùng thất bại");
    }
  });
  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    if (actions.payload.data) {
      state.response = actions.payload;
      NotificationSuccess("Thông báo", "Cập nhật người dùng thành công");
    } else {
      state.response = actions.payload;
      NotificationSuccess("Thông báo", "Cập nhật người dùng thất bại");
    }
  });
  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    state.users = state.users.filter(
      (item, index) => item.id !== actions.payload
    );
    NotificationSuccess("Thông báo", "Xoá người dùng thành công");
  });
  builder.addCase(showProfileAction.fulfilled, (state, actions) => {
    state.profile = actions.payload.data;
  });
  builder.addCase(changePasswordAction.fulfilled, (state, actions) => {
    state.response = actions.payload;
  });
});
export default userReducers;
