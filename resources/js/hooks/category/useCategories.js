import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getCategoriesClientAction,
} from "../../redux/actions/categoryAction";

const useCategories = () => {
  const categoryState = useSelector((state) => state.categoryState);
  const dispatch = useDispatch();

  const getAllCategories = () => {
    dispatch(getCategoriesAction());
  };

  const getCategoriesClient = () => {
    dispatch(getCategoriesClientAction());
  };

  return {
    categories: categoryState.categories,
    categoriesClient: categoryState.categoriesClient,
    getAllCategories,
    getCategoriesClient,
  };
};

export default useCategories;
