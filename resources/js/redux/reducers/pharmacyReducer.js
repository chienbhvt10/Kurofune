import { createReducer } from "@reduxjs/toolkit";
import {
  getPharmaciesAction,
  getPharmacyAction,
  getPharmaciesAdminAction,
} from "../actions/pharmacyAction";
const initialState = {
  pharmacies: undefined,
  pharmacy: undefined,
  pharmaciesAdmin: undefined,
};

const pharmacyReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPharmaciesAction.fulfilled, (state, actions) => {
    state.pharmacies = actions.payload.data;
  });
  builder.addCase(getPharmacyAction.fulfilled, (state, actions) => {
    state.pharmacy = actions.payload.data;
  });
  builder.addCase(getPharmaciesAdminAction.fulfilled, (state, actions) => {
    state.pharmaciesAdmin = actions.payload.data.data;
  });
});

export default pharmacyReducer;
