import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useAdminCategories = () => {
  const categoryState = useSelector((state) => state.adminCategoryState);
  const { from, total, to, current_page, last_page } = useSelector(
    (state) => state.adminCategoryState
  );
  const dispatch = useDispatch();

  const getAdminCategories = (payload) => {
    dispatch(getAllCategoriesAdminAction(payload));
  };

  return {
    adminCategories: categoryState.adminCategories,
    pagination: {
      from,
      to,
      total,
      current_page,
      last_page,
    },
    getAdminCategories,
  };
};

export default useAdminCategories;
