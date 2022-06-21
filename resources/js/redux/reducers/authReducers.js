import { createReducer } from "@reduxjs/toolkit";
import { NO_ERROR } from "../../constants/error";
import {
  changePasswordAction,
  forgotPassword,
  login,
  logout,
  resetAuthResponse,
  resetPassword,
  showProfileAction,
  updateBillingAddressAction,
  updateProfileAction,
  updateShippingAddressAction,
  resetChangePasswordResponse,
} from "../actions/authAction";

const initialState = {
  userInfo: undefined,
  token: "",
  isLogin: false,
  profile: undefined,
  resLogin: undefined,
  isLoadingLogin: undefined,
  resLogout: undefined,
  resUpdateProfile: undefined,
  isLoadingUpdateProfile: undefined,
  resUpdateBillingAddress: undefined,
  resUpdateShippingAddress: undefined,
  resChangePassword: undefined,
  resForgotPassword: undefined,
  resResetPassword: undefined,
  resResetResponse: undefined,
  isLoading: true,
};

const authReducers = createReducer(initialState, (builder) => {
  // Start Login
  builder
    .addCase(login.pending, (state) => {
      state.isLoadingLogin = true;
    })
    .addCase(login.fulfilled, (state, actions) => {
      if (actions.payload.error_code === NO_ERROR) {
        return {
          ...state,
          resLogin: actions.payload,
          userInfo: actions.payload.data.user,
          token: actions.payload.data.access_token,
          isLogin: true,
          isLoadingLogin: false,
        };
      } else {
        return {
          ...state,
          resLogin: actions.payload,
          isLoadingLogin: false,
        };
      }
    })
    .addCase(login.rejected, (state) => {
      state.isLoadingLogin = false;
    });
    // End Login

  builder.addCase(forgotPassword.fulfilled, (state, actions) => {
    return {
      ...state,
      resForgotPassword: actions.payload,
    };
  });

  builder.addCase(resetPassword.fulfilled, (state, actions) => {
    return {
      ...state,
      resResetPassword: actions.payload,
    };
  });
  builder.addCase(resetChangePasswordResponse, (state) => {
    state.resChangePassword = undefined;
  });
  builder.addCase(resetAuthResponse.fulfilled, (state, actions) => {
    return {
      ...state,
      resChangePassword: undefined,
      resLogin: undefined,
      resUpdateProfile: undefined,
      resUpdateShippingAddress: undefined,
      resUpdateBillingAddress: undefined,
      resForgotPassword: undefined,
      resLogout: undefined,
      resResetPassword: undefined,
    };
  });
  builder.addCase(logout.fulfilled, (state, actions) => {
    if (actions.payload.error_code === "NO_ERROR") {
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
      if (actions.payload.error_code === "ERROR") {
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
    return {
      ...state,
      resChangePassword: actions.payload,
    };
  });

  // Start Update profile
  builder
    .addCase(updateProfileAction.pending, (state, actions) => {
      state.isLoadingUpdateProfile = true;
    })
    .addCase(updateProfileAction.fulfilled, (state, actions) => {
      state.resUpdateProfile = actions.payload;
      state.isLoadingUpdateProfile = false;
    })
    .addCase(updateProfileAction.rejected, (state, actions) => {
      state.resUpdateProfile = actions.payload;
      state.isLoadingUpdateProfile = false;
    });
  // End Update profile

  builder.addCase(updateBillingAddressAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateBillingAddress: actions.payload,
    };
  });
  builder.addCase(updateShippingAddressAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateShippingAddress: actions.payload,
    };
  });
});
export default authReducers;
