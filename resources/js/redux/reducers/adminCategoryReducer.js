import { createReducer } from "@reduxjs/toolkit";
import {
  createCategoryAdminAction,
  deleteAdminCategoryAction,
  getCategoryAdminAction,
  updateAdminCategoryAction,
  getAllCategoriesAdminAction,
} from "../actions/categoryAdminAction.js";

const initialState = {
  adminCategories: undefined,
  adminCategory: undefined,
  resGetAdminCategory: undefined,
  adminCategoryRes: undefined,
  resDeleteCategory: undefined,
  resCreateCategory: undefined,
  resUpdateCategory: undefined,
};

const adminCategoryReducers = createReducer(initialState, (builder) => {
  builder.addCase(getAllCategoriesAdminAction.fulfilled, (state, actions) => {
    state.adminCategories = actions.payload?.data;
    state.resDeleteCategory = undefined;
    state.resCreateCategory = undefined;
    state.resUpdateCategory = undefined;
  });

  // Get Category
  builder.addCase(getCategoryAdminAction.fulfilled, (state, actions) => {
    state.adminCategory = actions.payload?.data;
    state.resGetAdminCategory = actions.payload;
    state.resDeleteCategory = undefined;
    state.resCreateCategory = undefined;
    state.resUpdateCategory = undefined;
  });

  // Create Category
  builder.addCase(createCategoryAdminAction.fulfilled, (state, actions) => {
    state.resCreateCategory = actions.payload;
  });
  builder.addCase(createCategoryAdminAction.rejected, (state, actions) => {
    state.resCreateCategory = actions.payload;
  });

  // Update Category
  builder.addCase(updateAdminCategoryAction.fulfilled, (state, actions) => {
    state.resUpdateCategory = actions.payload;
  });
  builder.addCase(updateAdminCategoryAction.rejected, (state, actions) => {
    state.resUpdateCategory = actions.payload;
  });

  // Delete Category
  builder.addCase(deleteAdminCategoryAction.fulfilled, (state, actions) => {
    state.resDeleteCategory = actions.payload;
  });
  builder.addCase(deleteAdminCategoryAction.rejected, (state, actions) => {
    state.resDeleteCategory = actions.payload;
  });
});

export default adminCategoryReducers;
