import { createSlice } from "@reduxjs/toolkit";
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
};
const cartSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartInfo.fulfilled, (state, action) => {
      if (action.payload.error_code === NO_ERROR) {
        state.cartInfo = action.payload.data;
      }
    });
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.resAddToCart = actions.payload;
        if (actions.payload.error_code === NO_ERROR) {
          NotificationSuccess("", actions.payload.message);
        } else {
          NotificationError("", actions.payload.message);
        }
      });
    builder
      .addCase(updateCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Update Cart failed");
        }
      });
    builder
      .addCase(deleteCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Delete cart failed");
        }
      });
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Delete cart item failed");
        }
      });
    builder
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.error_code === NO_ERROR) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Checkout failed");
        }
      });
    builder.addCase(resetCartCRUD, (state) => {
      return {
        ...state,
        resAddToCart: undefined
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
});

export default cartSlice.reducer;
