import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from 'redux-persist'
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import userState from "../reducers/userReducers";
import productState from "../reducers/productReducers";
import authState from "../reducers/authReducers";
import categoryState from "../reducers/categoryReducer";
import roleState from "../reducers/roleReducers";
import pharmacyState from "../reducers/pharmacyReducer";
import adminCategoryState from "./../reducers/adminCategoryReducer";

// export const store = configureStore({
//   reducer: {
//     userState,
//     productState,
//     authState,
//     roleState,
//     categoryState,
//     pharmacyState,
//     adminCategoryState,
//   },
// });

const reducers = combineReducers({
  userState,
  productState,
  authState,
  roleState,
  categoryState,
  pharmacyState,
  adminCategoryState,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authState']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
});
export const persistor = persistStore(store);

export default store