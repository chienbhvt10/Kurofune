import { createReducer } from "@reduxjs/toolkit";
import { getRoles } from "../actions/roleAction";
const initialState = {
  roles: [],
};

const roleReducers = createReducer(initialState, (builder) => {
  builder.addCase(getRoles.fulfilled, (state, actions) => {
    state.roles = actions.payload.data;
  });
});
export default roleReducers;
