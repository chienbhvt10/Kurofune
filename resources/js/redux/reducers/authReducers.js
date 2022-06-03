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
  isLoading: true,
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    if (actions.payload.user) {
      NotificationSuccess("Thông báo", "Đăng nhập thành công");
      return {
        ...state,
        resLogin: actions.payload,
        resLogout: undefined,
        userInfo: actions.payload.user,
        token: actions.payload.access_token,
        isLogin: true,
      };
    } else {
      NotificationError(
        "Thông báo",
        "Tên tài khoản hoặc mật khẩu không chính xác"
      );
      return {
        ...state,
        resLogin: actions.payload,
      };
    }
  });

  builder.addCase(forgotPassword.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", actions.payload.message);
    } else {
      NotificationError("Thông báo", "Gửi xác nhận tới email thất bại");
    }
    return {
      ...state,
      resForgotPassword: actions.payload,
    };
  });

  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Thay đổi mật khẩu thành công");
    } else {
      NotificationError("Thông báo", "Thay đổi mật khẩu thất bại");
    }
    return {
      ...state,
      resResetPassword: actions.payload,
    };
  });

  builder.addCase(resetResponseState.fulfilled, (state, actions) => {
    return {
      ...state,
      resResetResponse: undefined,
    };
  });
  builder.addCase(logout.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", actions.payload.message);
      return {
        ...state,
        resLogout: actions.payload,
        resLogin: undefined,
        userInfo: undefined,
        token: undefined,
        profile: undefined,
        isLogin: false,
      };
    } else {
      NotificationError("Thông báo", actions.payload.message);
      return {
        ...state,
        resLogout: actions.payload,
      };
    }
  });
  builder
    .addCase(showProfileAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(showProfileAction.fulfilled, (state, actions) => {
      if (actions.payload.message === "Unauthenticated.") {
        state.isLogin = false;
        state.profile = undefined;
        state.isLoading = false;
        state.userInfo = undefined;
      } else {
        state.isLogin = true;
        state.profile = actions.payload.data;
        state.isLoading = false;
      }
    })
    .addCase(showProfileAction.rejected, (state, action) => {
      state.isLogin = false;
      state.profile = undefined;
      state.userInfo = undefined;
      state.isLoading = false;
    });
  builder.addCase(changePasswordAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Thay đổi mật khẩu thành công");
    } else {
      NotificationError("Thông báo", "Thay đổi mật khẩu thất bại");
    }
    return {
      ...state,
      resChangePassword: actions.payload,
    };
  });
  builder.addCase(updateProfileAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
    return {
      ...state,
      resUpdateProfile: actions.payload,
    };
  });
  builder.addCase(updateBillingAddressAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
    return {
      ...state,
      resUpdateBillingAddress: actions.payload,
    };
  });
  builder.addCase(updateShippingAddressAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      NotificationSuccess("Thông báo", "Cập nhật thông tin thành công");
    } else {
      NotificationError("Thông báo", "Cập nhật thông tin thất bại");
    }
    return {
      ...state,
      resUpdateShippingAddress: actions.payload,
    };
  });
});
export default authReducers;
