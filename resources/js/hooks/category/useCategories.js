import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../redux/actions/categoryAction";

const useCategories = () => {
  const categoryState = useSelector((state) => state.categoryState);
  const dispatch = useDispatch();

  const getAllCategories = () => {
    dispatch(getCategoriesAction());
  };

  return {
    categories: categoryState.categories,
    getAllCategories,
  };
};

export default useCategories;
