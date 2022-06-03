import { createReducer } from "@reduxjs/toolkit";
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
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      return {
        ...state,
        resLogin: actions.payload,
        userInfo: actions.payload.user,
        token: actions.payload.access_token,
        isLogin: true,
      };
    } else {
      return {
        ...state,
        resLogin: actions.payload,
      };
    }
  });

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
    return {
      ...state,
      resLogout: actions.payload,
    };
  });
  builder.addCase(showProfileAction.fulfilled, (state, actions) => {
    return {
      ...state,
      profile: actions.payload.data,
    };
  });
  builder.addCase(changePasswordAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resChangePassword: actions.payload,
    };
  });
  builder.addCase(updateProfileAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateProfile: actions.payload,
    };
  });
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
