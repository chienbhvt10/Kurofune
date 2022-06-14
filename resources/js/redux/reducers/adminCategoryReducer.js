import { createReducer } from "@reduxjs/toolkit";
import {
  createCategoryAdminAction,
  deleteAdminCategoryAction,
  getCategoryAdminAction,
  updateAdminCategoryAction,
  getAllCategoriesAdminAction,
  resetCategoryResCRUDAction,
} from "../actions/categoryAdminAction.js";

const initialState = {
  adminCategories: undefined,
  adminCategory: undefined,
  resGetAdminCategory: undefined,
  adminCategoryRes: undefined,
  resDeleteCategory: undefined,
  resCreateCategory: undefined,
  resUpdateCategory: undefined,
  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
};

const adminCategoryReducers = createReducer(initialState, (builder) => {
  builder.addCase(getAllCategoriesAdminAction.fulfilled, (state, actions) => {
    return {
      ...state,
      adminCategories: actions.payload?.data?.data,
      total: actions.payload.data?.total,
      from: actions.payload.data?.from,
      to: actions.payload.data?.to,
      current_page: actions.payload.data?.current_page,
      last_page: actions.payload.data?.last_page,
    };
  });

  // Get Category successs
  builder.addCase(getCategoryAdminAction.fulfilled, (state, actions) => {
    return {
      ...state,
      adminCategory: actions.payload.data,
    };
  });

  // Create Category
  builder.addCase(createCategoryAdminAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateCategory: actions.payload,
    };
  });

  // Update Category
  builder.addCase(updateAdminCategoryAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resUpdateCategory: actions.payload,
    };
  });
  builder.addCase(updateAdminCategoryAction.rejected, (state, actions) => {
    return {
      ...state,
      resUpdateCategory: actions.payload,
    };
  });

  // Delete Category
  builder.addCase(deleteAdminCategoryAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resDeleteCategory: actions.payload,
    };
  });
  builder.addCase(deleteAdminCategoryAction.rejected, (state, actions) => {
    return {
      ...state,
      resDeleteCategory: actions.payload,
    };
  });

  builder.addCase(resetCategoryResCRUDAction, (state) => {
    return {
      ...state,
      resCreateCategory: undefined,
      resUpdateCategory: undefined,
      resDeleteCategory: undefined,
    };
  });
});

export default adminCategoryReducers;
