import { createReducer } from "@reduxjs/toolkit";
import { roles } from "../actions/roleAction";
const initialState = {
  roles: [],
};

const authReducers = createReducer(initialState, (builder) => {
  builder.addCase(roles.fulfilled, (state, actions) => {
    state.roles = actions.payload.data;
  });
  builder.addCase(roles.rejected, (state, actions) => {
    console.log("Reject Action");
  });
});
export default authReducers;
