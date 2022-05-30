import { createReducer } from "@reduxjs/toolkit";
import {
  getAllProductsAction,
  getProductAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  getProductClientAction,
} from "../actions/productAction";
const initialState = {
  products: undefined,
  product: undefined,
  resCreateProduct: undefined,
  resUpdateProduct: undefined,
  resDeleteProduct: undefined,

  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getAllProductsAction.fulfilled, (state, actions) => {
    state.products = actions.payload?.data?.data;
    state.resCreateProduct = undefined;
    state.resUpdateProduct = undefined;
    state.resDeleteProduct = undefined;

    state.total = actions.payload.data.total;
    state.from = actions.payload.data.from;
    state.to = actions.payload.data.to;
    state.current_page = actions.payload.data.current_page;
    state.last_page = actions.payload.data.last_page;
  });
  builder.addCase(getProductAction.fulfilled, (state, actions) => {
    state.product = actions.payload?.data;
    state.resCreateProduct = undefined;
    state.resUpdateProduct = undefined;
    state.resDeleteProduct = undefined;
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
