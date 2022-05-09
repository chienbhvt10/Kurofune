import { createReducer } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "../actions/productAction";
const initialState = {
  products: [],
  product: {},
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getProducts.fulfilled, (state, actions) => {
    state.products = actions.payload;
  });
  builder.addCase(getProduct.fulfilled, (state, actions) => {
    state.product = actions.payload;
  });
});
export default productReducers;
