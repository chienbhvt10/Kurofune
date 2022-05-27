import { createReducer } from "@reduxjs/toolkit";
import {
  getPharmaciesAction,
  getPharmacyAction,
} from "../actions/pharmacyAction";
const initialState = {
  pharmacies: undefined,
  pharmacy: undefined,
};

const pharmacyReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPharmaciesAction.fulfilled, (state, actions) => {
    state.pharmacies = actions.payload.data;
  });
  builder.addCase(getPharmacyAction.fulfilled, (state, actions) => {
    state.pharmacy = actions.payload.data;
  });
});

export default pharmacyReducer;
