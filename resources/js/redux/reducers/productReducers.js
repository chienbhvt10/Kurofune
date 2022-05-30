import { createReducer } from "@reduxjs/toolkit";
import {
  getAllProductsAction,
  getProductAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../actions/productAction";
const initialState = {
  products: undefined,
  product: undefined,
  resCreateProduct: undefined,
  resUpdateProduct: undefined,
  resDeleteProduct: undefined,
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getAllProductsAction.fulfilled, (state, actions) => {
    state.products = actions.payload?.data?.data;
  });
  builder.addCase(getProductAction.fulfilled, (state, actions) => {
    state.product = actions.payload?.data;
  });

  builder.addCase(createProductAction.fulfilled, (state, actions) => {
    state.resCreateProduct = actions.payload;
  });

  builder.addCase(updateProductAction.fulfilled, (state, actions) => {
    state.resUpdateProduct = actions.payload;
  });

  builder.addCase(deleteProductAction.fulfilled, (state, actions) => {
    state.resDeleteProduct = actions.payload;
  });
  builder.addCase(getProductClientAction.fulfilled, (state, actions) => {
    state.productClient = actions.payload;
  });
});
export default productReducers;
