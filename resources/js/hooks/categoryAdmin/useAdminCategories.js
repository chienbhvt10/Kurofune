import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useAdminCategories = () => {
  const categoryState = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const getAdminCategories = (payload) => {
    dispatch(getAllCategoriesAdminAction(payload));
  };

  return {
    adminCategories: categoryState.adminCategories,
    getAdminCategories,
  };
};

export default useAdminCategories;
