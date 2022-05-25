import { createReducer } from "@reduxjs/toolkit";
import {
  getCategoriesAction,
  getCategoryAction,
} from "../actions/categoryAction";
const initialState = {
  categories: undefined,
  category: undefined,
};

const categoryReducers = createReducer(initialState, (builder) => {
  builder.addCase(getCategoriesAction.fulfilled, (state, actions) => {
    state.categories = actions.payload.data.data;
  });
  builder.addCase(getCategoryAction.fulfilled, (state, actions) => {
    state.category = actions.payload.data;
  });
});

export default categoryReducers;
