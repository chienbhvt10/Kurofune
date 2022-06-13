import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { roleApis } from "../../services/role-apis";

const roleActions = {
  getRoles: createAction("GET_ROLES"),
};

export const getRoles = createAsyncThunk(
  roleActions.getRoles,
  async (payload) => {
    const res = await roleApis.roles().then((data) => data);
    return res;
  }
);

export default roleActions;
