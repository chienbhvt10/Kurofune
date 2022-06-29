import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { downloadBlob } from "../../helper/handler";
import { userApis } from "../../services/user-apis";

const userActions = {
  getCompany: createAction("GET_COMPANY"),
  getUsers: createAction("GET_USERS"),
  getUser: createAction("GET_USER"),
  createUser: createAction("CREATE_USER"),
  updateUser: createAction("UPDATE_USER"),
  deleteUser: createAction("DELETE_USER"),
  resetResCRUD: createAction("RESET_RES_CRUD"),
  selectRole: createAction("SELECT_ROLE"),
  selectCompany: createAction("SELECT_COMPANY"),
  exportCsvReportUser: createAction("EXPORT_CSV_REPORT_USER"),
  importCsvUser: createAction("IMPORT_CSV_REPORT_USER"),
};

export const getCompanyAction = createAsyncThunk(
  userActions.getCompany,
  async (payload) => {
    const res = await userApis
      .getCompany(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const getUsersAction = createAsyncThunk(
  userActions.getUsers,
  async (payload) => {
    const res = await userApis
      .users(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
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
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userApis.createUser(payload).then((data) => data);
      return res;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response.request.response));
    }
  }
);

export const updateUserAction = createAsyncThunk(
  userActions.updateUser,
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userApis.updateUser(payload).then((data) => data);
      return res;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response.request.response));
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  userActions.deleteUser,
  async (payload) => {
    const res = await userApis
      .deleteUser(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);

export const resetResCRUDAction = createAsyncThunk(
  userActions.resetResCRUD,
  async () => {
    return;
  }
);

export const exportReportUserAction = createAsyncThunk(
  userActions.exportCsvReportUser,
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userApis.exportCsvReportUser(payload).then((data) => {
        const dateExported = new Date();
        const fileName = `${
          payload?.company_name ? payload?.company_name + "_" : ""
        }${payload?.role ? payload?.role + "_users" : "users"}_report_${
          dateExported.toISOString().split("T")[0]
        }.csv`;

        downloadBlob(data, fileName);
        return data;
      });
      return res;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response.request.response));
    }
  }
);

export const importUserAction = createAsyncThunk(
  userActions.importCsvUser,
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userApis.importCsvUser(payload).then((data) => data);
      return res;
    } catch (err) {
      return rejectWithValue(JSON.parse(err.response.request.response));
    }
  }
);

export const selectRoleAction = userActions.selectRole;
export const selectCompanyAction = userActions.selectCompany;

export default userActions;
