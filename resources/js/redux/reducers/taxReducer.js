import { createReducer } from "@reduxjs/toolkit";
import {
  getTaxesAction,
  getTaxAction,
  addTaxAction,
  deleteTaxAction,
  updateTaxAction,
} from "../actions/taxAction";
const initialState = {
  taxes: undefined,
  tax: undefined,
  resAddTax: undefined,
  resUpdateTax: undefined,
  resDeleteTax: undefined,

  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
};

const taxReducers = createReducer(initialState, (builder) => {
  builder.addCase(getTaxesAction.fulfilled, (state, actions) => {
    state.taxes = actions?.payload.data.data;
    state.total = actions.payload.data?.total;
    state.from = actions.payload.data?.from;
    state.to = actions.payload.data?.to;
    state.current_page = actions.payload.data?.current_page;
    state.last_page = actions.payload.data?.last_page;
  });

  builder.addCase(getTaxAction.fulfilled, (state, actions) => {
    state.tax = actions?.payload.data;
  });

  builder.addCase(addTaxAction.fulfilled, (state, actions) => {
    state.resAddTax = actions?.payload.data;
  });

  builder.addCase(updateTaxAction.fulfilled, (state, actions) => {
    state.resUpdateTax = actions.payload;
  });

  builder.addCase(deleteTaxAction.fulfilled, (state, actions) => {
    state.resDeleteTax = actions.payload;
  });
});

export default taxReducers;
