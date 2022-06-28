import { createReducer } from "@reduxjs/toolkit";
import {
  getPharmaciesAction,
  getPharmacyAction,
  getPharmaciesAdminAction,
  searchPharmacyAction,
  resetPharmacyAction,
} from "../actions/pharmacyAction";
const initialState = {
  pharmacies: undefined,
  pharmacy: undefined,
  pharmaciesAdmin: undefined,
  searchPharmacy: undefined,
  emptyPharmacy: undefined,
};

const pharmacyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPharmaciesAction.fulfilled, (state, actions) => {
      state.pharmacies = actions.payload.data;
    })
    .addCase(getPharmacyAction.fulfilled, (state, actions) => {
      state.pharmacy = actions.payload.data;
    })
    .addCase(getPharmaciesAdminAction.fulfilled, (state, actions) => {
      state.pharmaciesAdmin = actions.payload.data.data;
    })
    .addCase(searchPharmacyAction.fulfilled, (state, actions) => {
      state.searchPharmacy = actions.payload.data?.data || [];
      if (actions.payload.data?.data) {
        state.emptyPharmacy = false;
      } else {
        state.emptyPharmacy = true;
      }
    })
    .addCase(resetPharmacyAction.fulfilled, (state, actions) => {
      state.searchPharmacy =undefined;
    });
});

export default pharmacyReducer;
