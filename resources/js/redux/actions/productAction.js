import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { productApis } from "../../services/product-apis";

const productActions = {
  getProducts: createAction("GET_PRODUCTS"),
  getProduct: createAction("GET_PRODUCT"),
  getProductClient: createAction("GET_PRODUCT_CLIENT"),
  addToCart: createAction("ADD_TO_CART"),
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

export const getProductClientAction = createAsyncThunk(
  productActions.getProductClient,
  async (payload) => {
    const res = await productApis
      .productClient(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const addToCartAction = createAsyncThunk(
  productActions.addToCart,
  async (payload) => {
    const res = await productApis
      .addToCartClient(payload)
      .then((data) => data)
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export default productActions;
