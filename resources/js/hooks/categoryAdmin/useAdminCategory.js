import { useDispatch, useSelector } from "react-redux";
import { getCategoryAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useAdminCategory = () => {
  const categoryState = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const getAdminCategory = (payload) => {
    dispatch(getCategoryAdminAction(payload));
  };

  return {
    adminCategory: categoryState.adminCategory,
    getAdminCategory,
  };
};

export default useAdminCategory;
