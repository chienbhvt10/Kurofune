import { createReducer } from "@reduxjs/toolkit";
import {
  getProduct,
  getProductClientAction,
  getProducts,
} from "../actions/productAction";
const initialState = {
  products: undefined,
  product: undefined,
  productClient: undefined,
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getProducts.fulfilled, (state, actions) => {
    state.products = actions.payload;
  });
  builder.addCase(getProduct.fulfilled, (state, actions) => {
    state.product = actions.payload;
  });
  builder.addCase(getProductClientAction.fulfilled, (state, actions) => {
    state.productClient = actions.payload;
  });
});
export default productReducers;
