import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { pharmacyApi } from "../../services/pharmacy-apis";

const pharmacyAction = {
  getPharmacies: createAction("GET_PHARMACIES"),
  getPharmacy: createAction("GET_PHARMACY"),
};

export const getPharmaciesAction = createAsyncThunk(
  pharmacyAction.getPharmacies,
  async (payload) => {
    const res = await pharmacyApi
      .pharmacies()
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
export default pharmacyAction;
