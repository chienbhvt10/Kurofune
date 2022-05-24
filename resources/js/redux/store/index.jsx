import { configureStore } from "@reduxjs/toolkit";
import userState from "../reducers/userReducers";
import productState from "../reducers/productReducers";
import authState from "../reducers/authReducers";
import categoryState from "../reducers/categoryReducer";
import roleState from "../reducers/roleReducers";
import pharmacyState from "../reducers/pharmacyReducer";

import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    userState,
    productState,
    authState,
    roleState,
    categoryState,
    pharmacyState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
