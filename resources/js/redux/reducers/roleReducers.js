import { createReducer } from "@reduxjs/toolkit";
import { getRoles } from "../actions/roleAction";
const initialState = {
  roles: [],
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(getRoles.fulfilled, (state, actions) => {
    state.roles = actions.payload.data;
  });
  builder.addCase(getRoles.rejected, (state, actions) => {
    console.log("Reject Action");
  });
});
export default authReducers;
