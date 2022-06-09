import { createSlice } from "@reduxjs/toolkit";
import {
  getCartInfo,
  updateCart,
  deleteCart,
  addToCart,
} from "../actions/cartAction";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
const initialState = {
  cartInfo: { cart_item: [], total: 0, key: "" },
  isLoading: false,
};
const cartSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartInfo.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.cartInfo = action.payload.data;
      }
    });
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, actions) => {
        state.isLoading = false;
        if (actions.payload.status_code === 200) {
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
        if (action.payload.status_code === 200) {
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
        if (action.payload.status_code === 200) {
          NotificationSuccess("", action.payload.message);
        } else {
          NotificationError("", "Delete cart failed");
        }
      });
  },
});
export default cartSlice.reducer;
