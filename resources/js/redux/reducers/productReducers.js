import { createReducer } from "@reduxjs/toolkit";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  createProductAction,
  deleteProductAction,
  getAllProductsAction,
  getProductAction,
  getProductClientAction,
  updateProductAction,
} from "../actions/productAction";
const initialState = {
  products: undefined,
  product: undefined,
  resCreateProduct: undefined,
  resUpdateProduct: undefined,
  resDeleteProduct: undefined,
  loadingCreateProduct: false,
  loadingUpdateProduct: false,
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

  builder
    .addCase(createProductAction.fulfilled, (state, actions) => {
      NotificationSuccess("", actions.payload.message);
      return {
        ...state,
        loadingCreateProduct: false,
        resCreateProduct: actions.payload,
      };
    })
    .addCase(createProductAction.pending, (state, actions) => {
      return {
        ...state,
        loadingCreateProduct: true,
      };
    })
    .addCase(createProductAction.rejected, (state, actions) => {
      NotificationError("", actions.payload?.error_message || "Error");
      return {
        ...state,
        loadingCreateProduct: false,
        resCreateProduct: actions.payload,
      };
    });

  builder
    .addCase(updateProductAction.fulfilled, (state, actions) => {
      NotificationSuccess("", actions.payload.message);
      return {
        ...state,
        loadingUpdateProduct: false,
        resUpdateProduct: actions.payload,
      };
    })
    .addCase(updateProductAction.pending, (state, actions) => {
      return {
        ...state,
        loadingUpdateProduct: true,
      };
    })
    .addCase(updateProductAction.rejected, (state, actions) => {
      NotificationError("", actions.payload?.error_message || "Error");
      return {
        ...state,
        loadingUpdateProduct: false,
        resCreateProduct: actions.payload,
      };
    });

  builder.addCase(deleteProductAction.fulfilled, (state, actions) => {
    state.resDeleteProduct = actions.payload;
  });
  builder.addCase(getProductClientAction.fulfilled, (state, actions) => {
    state.productClient = actions.payload.data;
  });
});
export default productReducers;
