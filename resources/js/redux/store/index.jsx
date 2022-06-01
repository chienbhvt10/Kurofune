import { configureStore } from "@reduxjs/toolkit";
import userState from "../reducers/userReducers";
import productState from "../reducers/productReducers";
import authState from "../reducers/authReducers";
import categoryState from "../reducers/categoryReducer";
import roleState from "../reducers/roleReducers";
import pharmacyState from "../reducers/pharmacyReducer";
import adminCategoryState from "./../reducers/adminCategoryReducer";

export const store = configureStore({
  reducer: {
    userState,
    productState,
    authState,
    roleState,
    categoryState,
    pharmacyState,
    adminCategoryState,
  },
});
