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
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Tạo mới người dùng thành công");
    } else {
      NotificationError("Thông báo", "Tạo mới người dùng thất bại");
    }
    return {
      ...state,
      resCreateUser: actions.payload,
    };
  });

  builder.addCase(updateUserAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật người dùng thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật người dùng thất bại");
    }
    return {
      ...state,
      resUpdateUser: actions.payload,
    };
  });

  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Xoá người dùng thành công");
    } else {
      NotificationError("Thông báo", "Xoá người dùng thất bại");
    }
  });

  builder.addCase(resetResCRUDAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateUser: undefined,
      resUpdateUser: undefined,
    };
  });
});
export default userReducers;
