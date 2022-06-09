import { configureStore } from "@reduxjs/toolkit";
import authState from "../reducers/authReducers";
import categoryState from "../reducers/categoryReducer";
import pharmacyState from "../reducers/pharmacyReducer";
import productState from "../reducers/productReducers";
import roleState from "../reducers/roleReducers";
import userState from "../reducers/userReducers";
import adminCategoryState from "./../reducers/adminCategoryReducer";
import logChatState from './../reducers/logChatReducer';

export const store = configureStore({
  reducer: {
    userState,
    productState,
    authState,
    roleState,
    categoryState,
    pharmacyState,
    adminCategoryState,
    logChatState
  },
});

export default store
