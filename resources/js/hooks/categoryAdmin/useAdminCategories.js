import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  getAllCategoriesAdminAction,
  resetCategoryResCRUDAction,
} from "../../redux/actions/categoryAdminAction.js";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useAdminCategories = () => {
  const lang = getCurrentLanguage();
  const { from, total, to, current_page, last_page, adminCategories } =
    useSelector((state) => state.adminCategoryState);
  const [loadingListCategory, setLoadingListCategory] = React.useState(false);
  const dispatch = useDispatch();

  const getAdminCategories = (payload) => {
    setLoadingListCategory(true);
    dispatch(getAllCategoriesAdminAction(payload));
    dispatch(resetCategoryResCRUDAction());
  };

  React.useEffect(() => {
    if (!adminCategories) {
      getAdminCategories({ page: current_page });
    }
  }, []);
  React.useEffect(() => {
    if (adminCategories) {
      setLoadingListCategory(false);
    }
  }, [adminCategories]);
  return {
    adminCategories,
    pagination: {
      from,
      to,
      total,
      current_page,
      last_page,
    },
    getAdminCategories,
    loadingListCategory,
    setLoadingListCategory
  };
};

export default useAdminCategories;
