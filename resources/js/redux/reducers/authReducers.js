import { createReducer } from "@reduxjs/toolkit";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";

import {
  login,
  forgotPassword,
  resetPassword,
  resetResponseState,
  logout,
  showProfileAction,
  changePasswordAction,
  updateProfileAction,
  updateBillingAddressAction,
  updateShippingAddressAction,
} from "../actions/authAction";
const initialState = {
  userInfo: undefined,
  token: "",
  isLogin: false,
  profile: undefined,
  resLogin: undefined,
  resLogout: undefined,
  resUpdateProfile: undefined,
  resUpdateBillingAddress: undefined,
  resUpdateShippingAddress: undefined,
  resChangePassword: undefined,
  resForgotPassword: undefined,
  resResetPassword: undefined,
  resResetResponse: undefined,
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    state.resLogin = actions.payload;
    if (actions.payload.user) {
      state.resLogout = undefined;
      state.userInfo = actions.payload.user;
      state.token = actions.payload.access_token;
      state.isLogin = true;
      NotificationSuccess("Thông báo", "Đăng nhập thành công");
    } else {
      NotificationError(
        "Thông báo",
        "Tên tài khoản hoặc mật khẩu không chính xác"
      );
    }
  });

  builder.addCase(forgotPassword.fulfilled, (state, actions) => {
    state.resForgotPassword = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", actions.payload.message);
    } else {
      NotificationError("Thông báo", "Gửi xác nhận tới email thất bại");
    }
  });

  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    state.resResetPassword = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Thay đổi mật khẩu thành công");
    } else {
      NotificationError("Thông báo", "Thay đổi mật khẩu thất bại");
    }
  });

  builder.addCase(resetResponseState.fulfilled, (state, actions) => {
    state.resResetResponse = undefined;
  });
  builder.addCase(logout.fulfilled, (state, actions) => {
    state.resLogout = actions.payload;
    if (actions.payload.status_code === 200) {
      state.resLogin = undefined;
      state.userInfo = undefined;
      state.token = undefined;
      state.profile = undefined;
      NotificationSuccess("Thông báo", actions.payload.message);
    } else {
      NotificationError("Thông báo", actions.payload.message);
    }
  });
  builder.addCase(showProfileAction.fulfilled, (state, actions) => {
    state.profile = actions.payload.data;
  });
  builder.addCase(changePasswordAction.fulfilled, (state, actions) => {
    state.resChangePassword = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Thay đổi mật khẩu thành công");
    } else {
      NotificationError("Thông báo", "Thay đổi mật khẩu thất bại");
    }
  });
  builder.addCase(updateProfileAction.fulfilled, (state, actions) => {
    state.resUpdateProfile = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
  });
  builder.addCase(updateBillingAddressAction.fulfilled, (state, actions) => {
    state.resUpdateBillingAddress = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
  });
  builder.addCase(updateShippingAddressAction.fulfilled, (state, actions) => {
    state.resUpdateShippingAddress = actions.payload;
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
  });
});
export default authReducers;
