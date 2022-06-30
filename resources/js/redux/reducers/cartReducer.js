import { createReducer } from "@reduxjs/toolkit";
import {
  getCartInfo,
  updateCart,
  deleteCart,
  addToCart,
  deleteCartItem,
  checkout,
  resetCartCRUD,
  clearCart,
} from "../actions/cartAction";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import { NO_ERROR } from "../../constants/error";
const initialState = {
  cartInfo: { cart_item: [], total: 0, key: "" },
  isLoading: false,
  resAddToCart: undefined,
  resCheckout:undefined,
};
const cartSlice = createReducer(initialState,(builder) => {
    builder.addCase(getCartInfo.fulfilled, (state, action) => {
      if (action.payload?.error_code === NO_ERROR) {
        return{
          ...state,
          cartInfo : action.payload.data
        }
      }
    });
    builder
      .addCase(addToCart.pending, (state) => {
        return{
          ...state,
          isLoading : true
        }
      })
      .addCase(addToCart.fulfilled, (state, actions) => {
        if (actions.payload.error_code === NO_ERROR) {
          NotificationSuccess("", actions.payload.message);
        } else {
          NotificationError("", actions.payload.message);
        }
        return{
          ...state,
          isLoading : false,
          resAddToCart : actions.payload,
        }
      });
    builder
      .addCase(updateCart.pending, (state, action) => {
        return{
          ...state,
          isLoading : true
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Update Cart failed");
        }
        return{
          ...state,
          isLoading : false
        }
      });
    builder
      .addCase(deleteCart.pending, (state, action) => {
        return{
          ...state,
          isLoading : true
        }
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Delete cart failed");
        }
        return{
          ...state,
          isLoading : false,
        }
      });
    builder
      .addCase(deleteCartItem.pending, (state) => {
        return{
          ...state,
          isLoading : true,
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Delete cart item failed");
        }
        return{
          ...state,
          isLoading : false,
        }
      });
    builder
      .addCase(checkout.pending, (state) => {
        return{
          ...state,
          isLoading : true,
        }
      })
      .addCase(checkout.fulfilled, (state, action) => {
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        }
        return{
          ...state,
          isLoading : false,
          resCheckout : action.payload,
        }
      });
    builder.addCase(resetCartCRUD, (state) => {
      return {
        ...state,
        resAddToCart: undefined,
        resCheckout: undefined
      };
    });

    builder.addCase(clearCart, (state) => {
      return{
        ...state,
        resAddToCart: undefined,
        cartInfo: undefined
      }
    })
  },
);

export default cartSlice;
