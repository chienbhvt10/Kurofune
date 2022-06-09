import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApis } from "../../services/category-apis";

const categoryAdminActions = {
  getAdminCategories: createAction("GET_CATEGORIES_ADMIN"),
  getAdminCategory: createAction("GET_CATEGORY_ADMIN"),
  createAdminCategory: createAction("CREATE_CATEGORY_ADMIN"),
  updateAdminCategory: createAction("UPDATE_CATEGORY_ADMIN"),
  deleteAdminCategory: createAction("DELETE_CATEGORY_ADMIN"),
};

export const getAllCategoriesAdminAction = createAsyncThunk(
  categoryAdminActions.getAdminCategories,
  async (payload) => {
    const res = await categoryApis
      .categoriesAdmin(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const getCategoryAdminAction = createAsyncThunk(
  categoryAdminActions.getAdminCategory,
  async (payload) => {
    const res = await categoryApis
      .categoryAdmin(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const createCategoryAdminAction = createAsyncThunk(
  categoryAdminActions.createAdminCategory,
  async (payload) => {
    const res = await categoryApis
      .createAdminCategory(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const updateAdminCategoryAction = createAsyncThunk(
  categoryAdminActions.updateAdminCategory,
  async (payload) => {
    const res = await categoryApis
      .updateAdminCategory(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);

export const deleteAdminCategoryAction = createAsyncThunk(
  categoryAdminActions.deleteAdminCategory,
  async (payload) => {
    const res = await categoryApis
      .deleteAdminCategory(payload)
      .then((data) => data)
      .catch((errors) => JSON.parse(errors.response.request.response));
    return res;
  }
);
export default categoryAdminActions;
