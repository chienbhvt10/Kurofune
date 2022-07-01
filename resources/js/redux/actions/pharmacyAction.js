import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { pharmacyApi } from "../../services/pharmacy-apis";

const pharmacyAction = {
  getPharmacies: createAction("GET_PHARMACIES"),
  getPharmacy: createAction("GET_PHARMACY"),
  getPharmaciesAdmin: createAction("GET_PHARMACIES_ADMIN"),
  searchPharmacy: createAction("SEARCH_PHARMACY"),
  resetPharmacy: createAction("RESET_PHARMACY"),
  getProductPharmacy: createAction("GET_PRODUCT_PHARMACY")
};

export const getPharmaciesAction = createAsyncThunk(
  pharmacyAction.getPharmacies,
  async () => {
    const res = await pharmacyApi
      .pharmacies()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const getPharmaciesAdminAction = createAsyncThunk(
  pharmacyAction.getPharmaciesAdmin,
  async () => {
    const res = await pharmacyApi
      .pharmaciesAdmin()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const getPharmacyAction = createAsyncThunk(
  pharmacyAction.getPharmacy,
  async (payload) => {
    const res = await pharmacyApi
      .pharmacy(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const searchPharmacyAction = createAsyncThunk(
  pharmacyAction.searchPharmacy,
  async (payload) => {
    const res = await pharmacyApi
      .searchPharmacy(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const resetPharmacyAction = createAsyncThunk(
  pharmacyAction.resetPharmacy,
  async () => {
    return;
  }
);
export const getProductPharmacyAction = createAsyncThunk(
  pharmacyAction.getProductPharmacy,
  async (payload) => {
    const res = await pharmacyApi
      .productPharmacy(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export default pharmacyAction;
