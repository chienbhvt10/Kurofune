import { createReducer } from "@reduxjs/toolkit";
import {
  getCategoriesAction,
  getCategoryAction,
  getCategoriesClientAction,
} from "../actions/categoryAction";
const initialState = {
  categories: undefined,
  category: undefined,
  categoriesClient: undefined,
};

const categoryReducers = createReducer(initialState, (builder) => {
  builder.addCase(getCategoriesAction.fulfilled, (state, actions) => {
    state.categories = actions.payload.data;
  });
  builder.addCase(getCategoryAction.fulfilled, (state, actions) => {
    state.category = actions.payload.data;
  });
  builder.addCase(getCategoriesClientAction.fulfilled, (state, actions) => {
    state.categoriesClient = actions?.payload?.data;
  });
});

export default categoryReducers;
