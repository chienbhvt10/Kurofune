import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../services/auth-apis";

const authActions = {
  login: createAction("LOGIN"),
  forgotPassword: createAction("FORGOT_PASSWORD"),
  resetPassword: createAction("RESET_PASSWORD"),
  resetResponseState: createAction("RESET_RESPONSE_STATE"),
  showProfile: createAction("SHOW_PROFILE"),
  changePassword: createAction("CHANGE_PASSWORD"),
  updateProfile: createAction("UPDATE_PROFILE"),
  updateBillingAddress: createAction("UPDATE_BILLING_ADDRESS"),
  updateShippingAddress: createAction("UPDATE_SHIPPING_ADDRESS"),
};

export const login = createAsyncThunk(authActions.login, async (payload) => {
  const res = await authApis
    .login(payload)
    .then((data) => data)
    .catch((errors) => JSON.parse(errors.response.request.response));
  localStorage.setItem("access_token", res.access_token);
  return res;
});

export const forgotPassword = createAsyncThunk(
  authActions.forgotPassword,
  async (payload) => {
    const res = await authApis
      .forgotPassword(payload)
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("reset_email", payload);
          return data;
        }
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const resetPassword = createAsyncThunk(
  authActions.resetPassword,
  async (payload) => {
    const res = await authApis
      .resetPassword(payload)
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.removeItem("reset_email");
          return data;
        }
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const resetResponseState = createAsyncThunk(
  authActions.resetResponseState,
  async () => {
    return;
  }
);

export const logout = createAsyncThunk(authActions.logout, async () => {
  const res = await authApis
    .logout()
    .then((data) => data)
    .catch((errors) => JSON.parse(errors.response.request.response));
  localStorage.removeItem("access_token");
  return res;
});
export const showProfileAction = createAsyncThunk(
  authActions.showProfile,
  async (payload) => {
    const res = await authApis
      .showProfile(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const changePasswordAction = createAsyncThunk(
  authActions.changePassword,
  async (payload) => {
    const res = await authApis
      .changePassword(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);

export const updateProfileAction = createAsyncThunk(
  authActions.updateProfile,
  async (payload) => {
    const res = await authApis
      .updateProfile(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const updateBillingAddressAction = createAsyncThunk(
  authActions.updateBillingAddress,
  async (payload) => {
    const res = await authApis
      .updateBillingAddress(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const updateShippingAddressAction = createAsyncThunk(
  authActions.updateShippingAddress,
  async (payload) => {
    const res = await authApis
      .updateShippingAddress(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export default authActions;
