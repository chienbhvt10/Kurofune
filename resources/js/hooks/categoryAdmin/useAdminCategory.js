import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useAdminCategory = () => {
  const { adminCategory } = useSelector((state) => state.adminCategoryState);
  const [loadingCategory, setLoadingCategory] = React.useState(false);
  const dispatch = useDispatch();

  const getAdminCategory = (payload) => {
    setLoadingCategory(true)
    dispatch(getCategoryAdminAction(payload));
  };
  React.useEffect(() => {
    if (adminCategory) {
      setLoadingCategory(false);
    }
  }, [adminCategory]);
  return {
    adminCategory,
    getAdminCategory,
    loadingCategory,
    setLoadingCategory
  };
};

export default useAdminCategory;
