import { useDispatch, useSelector } from "react-redux";
import { getCategoryAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useAdminCategory = () => {
  const { adminCategory } = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const getAdminCategory = (payload) => {
    dispatch(getCategoryAdminAction(payload));
  };

  return {
    adminCategory,
    getAdminCategory,
  };
};

export default useAdminCategory;
