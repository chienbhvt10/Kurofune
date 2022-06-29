import { configureStore } from "@reduxjs/toolkit";
import authState from "../reducers/authReducers";
import categoryState from "../reducers/categoryReducer";
import pharmacyState from "../reducers/pharmacyReducer";
import productState from "../reducers/productReducers";
import roleState from "../reducers/roleReducers";
import userState from "../reducers/userReducers";
import adminCategoryState from "./../reducers/adminCategoryReducer";
import cartState from "../reducers/cartReducer";
import logChatState from "./../reducers/logChatReducer";
import taxState from "../reducers/taxReducer";
import orderHistoryState from "./../reducers/orderHistoryReducer";
import logQuestionState from "./../reducers/logQuestionReducer";

export const store = configureStore({
  reducer: {
    userState,
    productState,
    authState,
    roleState,
    categoryState,
    pharmacyState,
    adminCategoryState,
    logChatState,
    taxState,
    cartState,
    orderHistoryState,
    logQuestionState,
  },
});

export default store;
