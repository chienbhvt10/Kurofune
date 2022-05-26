import { useDispatch, useSelector } from "react-redux";
import { updateAdminCategoryAction } from "../../redux/actions/categoryAdminAction.js";

const useUpdateAdminCategory = () => {
  const adminCategoryState = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const updateAdminCategory = (data) => {
    return dispatch(updateAdminCategoryAction(data));
  };

  return {
    updateAdminCategory,
    resUpdateCategory: adminCategoryState.resUpdateCategory,
  };
};

export default useUpdateAdminCategory;
