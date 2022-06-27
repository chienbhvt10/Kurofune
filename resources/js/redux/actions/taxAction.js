import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { taxApis } from "../../services/tax-apis";

const taxesActions = {
  getTaxes: createAction("GET_TAXES"),
  getTax: createAction("GET_TAX"),
  addTax: createAction("ADD_TAX"),
  updateTax: createAction("UPDATE_TAX"),
  deleteTax: createAction("DELETE_TAX"),
  resetTaxCRUD: createAction("RESET_TAX_CRUD"),
};

export const getTaxesAction = createAsyncThunk(
  taxesActions.getTaxes,
  async (payload) => {
    const res = await taxApis
      .taxes(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const getTaxAction = createAsyncThunk(
  taxesActions.getTax,
  async (payload) => {
    const res = await taxApis
      .tax(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const addTaxAction = createAsyncThunk(
  taxesActions.addTax,
  async (payload) => {
    const res = await taxApis
      .addTax(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const updateTaxAction = createAsyncThunk(
  taxesActions.updateTax,
  async (payload) => {
    const res = await taxApis
      .updateTax(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const deleteTaxAction = createAsyncThunk(
  taxesActions.deleteTax,
  async (payload) => {
    const res = await taxApis
      .deleteTax(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const resetTaxCRUDAction = taxesActions.resetTaxCRUD;

export default taxesActions;
