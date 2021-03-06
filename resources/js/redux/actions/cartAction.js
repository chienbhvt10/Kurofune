import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApis } from "../../services/cart-apis";
const cartActions = {
  addToCart: createAction("ADD_TO_CART"),
  getCartInfo: createAction("GET_CART_INFO"),
  updateCart: createAction("UPDATE_CART"),
  deleteCart: createAction("DELETE_CART"),
  deleteCartItem: createAction("DELETE_CART_ITEM"),
  checkout: createAction("CHECKOUT"),
  resetCartCRUD: createAction("RESET_CART_CRUD"),
  clearCart: createAction("CLEAR_CART")
};

export const getCartInfo = createAsyncThunk(
  cartActions.getCartInfo,
  async () => {
    const res = await cartApis
      .getCartInfo()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const addToCart = createAsyncThunk(
  cartActions.addToCart,
  async (payload, { dispatch }) => {
    const res = await cartApis
      .addToCart(payload)
      .then((data) => {
        dispatch(getCartInfo());
        return data;
      })
      .catch((err) => JSON.parse(err.response.request.response));
    return res;
  }
);
export const updateCart = createAsyncThunk(
  cartActions.updateCart,
  async (payload, { dispatch }) => {
    const res = await cartApis
      .updateCart(payload)
      .then((data) => {
        dispatch(getCartInfo());
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const deleteCart = createAsyncThunk(
  cartActions.deleteCart,
  async (_, { dispatch }) => {
    const res = await cartApis
      .deleteCart()
      .then((data) => {
        dispatch(getCartInfo());
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const deleteCartItem = createAsyncThunk(
  cartActions.deleteCartItem,
  async (id, { dispatch }) => {
    const res = await cartApis
      .deleteCartItem(id)
      .then((data) => {
        dispatch(getCartInfo());
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const checkout = createAsyncThunk(
  cartActions.checkout,
  async (payload, { dispatch }) => {
    const res = await cartApis
      .checkout(payload)
      .then((data) => {
        dispatch(getCartInfo());
        return data;
      })
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const clearCart = cartActions.clearCart;
export const resetCartCRUD = cartActions.resetCartCRUD;
