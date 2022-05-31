import { createReducer } from "@reduxjs/toolkit";
import { NotificationError, NotificationSuccess } from "../../commons/Notification";
import {
  getProduct,
  getProductClientAction,
  getProducts,
  addToCartAction
} from "../actions/productAction";
const initialState = {
  products: undefined,
  product: undefined,
  productClient: undefined,
  resAddToCart: undefined,
};

const productReducers = createReducer(initialState, (builder) => {
  builder.addCase(getProducts.fulfilled, (state, actions) => {
    state.products = actions.payload;
  });
  builder.addCase(getProduct.fulfilled, (state, actions) => {
    state.product = actions.payload;
  });
  builder.addCase(getProductClientAction.fulfilled, (state, actions) => {
    state.productClient = actions.payload.data;
  });
  builder.addCase(addToCartAction.fulfilled, (state, actions) => {
    if (actions.payload.status_code === 200) {
      state.resAddToCart = actions.payload;
      NotificationSuccess("",actions.payload.message);
    } else {
      state.resAddToCart = actions.payload;
      NotificationError("", actions.payload.message);
    }
  });
});
export default productReducers;
