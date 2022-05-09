import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const productActions = {
  getProducts: createAction("GET_PRODUCTS"),
  getProduct: createAction("GET_PRODUCT"),
};

export const getProducts = createAsyncThunk(
  productActions.getProducts,
  async (payload) => {
    //fetch api
    return [{ hello: "hello", firstname: "aaaa", payload: payload }];
  }
);
export const getProduct = createAsyncThunk(
  productActions.getProduct,
  async (payload) => {
    //fetch api
    return { hello: "hello", firstname: "aaaa", payload: payload };
  }
);
export default productActions;
