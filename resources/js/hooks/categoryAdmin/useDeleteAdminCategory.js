import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminCategoryAction } from "../../redux/actions/categoryAdminAction.js";

const useDeleteAdminCategory = () => {
  const adminCategoryState = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const deleteAdminCategory = (id) => {
    dispatch(deleteAdminCategoryAction(id));
  };

  return {
    deleteAdminCategory,
    resDeleteCategory: adminCategoryState.resDeleteCategory,
  };
};

export default useDeleteAdminCategory;
