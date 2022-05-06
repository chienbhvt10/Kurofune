import { configureStore } from "@reduxjs/toolkit";
import userState from "../reducers/userReducers";
import productState from "../reducers/productReducers";
import authState from "../reducers/authReducers";

import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    userState,
    productState,
    authState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
