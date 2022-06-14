import { createReducer, createAction } from "@reduxjs/toolkit";
import {
  getAllProductsAction,
  getProductAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  getProductClientAction,
  getProducts,
  addToCartAction,
  resetProductResCRUD,
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
  productClient: undefined,
  resAddToCart: undefined,
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getAllProductsAction.fulfilled, (state, actions) => {
    return {
      ...state,
      products: actions.payload?.data?.data,
      total: actions.payload.data.total,
      from: actions.payload.data.from,
      to: actions.payload.data.to,
      current_page: actions.payload.data.current_page,
      last_page: actions.payload.data.last_page,
    };
  });
  builder.addCase(getProductAction.fulfilled, (state, actions) => {
    return {
      ...state,
      product: actions.payload?.data,
    };
  });

  builder.addCase(createProductAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateProduct: actions.payload,
    };
  });

  builder.addCase(updateProductAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateProduct: actions.payload,
    };
  });

  builder.addCase(deleteProductAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resDeleteProduct: actions.payload,
    };
  });
  builder.addCase(getProductClientAction.fulfilled, (state, actions) => {
    return {
      ...state,
      productClient: actions.payload.data,
    };
  });

  builder.addCase(resetProductResCRUD, (state, actions) => {
    return {
      ...state,
      resCreateProduct: undefined,
      resUpdateProduct: undefined,
      resDeleteProduct: undefined,
    };
  });
});
export default productReducers;
