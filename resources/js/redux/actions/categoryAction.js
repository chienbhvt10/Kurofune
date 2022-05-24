import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApis } from "../../services/category-apis";

const categoryActions = {
  getCategories: createAction("GET_CATEGORIES"),
  getCategory: createAction("GET_CATEGORY"),
};

export const getCategoriesAction = createAsyncThunk(
  categoryActions.getCategories,
  async (payload) => {
    const res = await categoryApis
      .categories()
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export const getCategoryAction = createAsyncThunk(
  categoryActions.getCategory,
  async (payload) => {
    const res = await categoryApis
      .category(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export default categoryActions;
