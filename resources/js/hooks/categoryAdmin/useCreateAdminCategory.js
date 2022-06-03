import { useDispatch, useSelector } from "react-redux";
import { createCategoryAdminAction } from "../../redux/actions/categoryAdminAction.js";

const useCreateAdminCategory = () => {
  const adminCategoryState = useSelector((state) => state.adminCategoryState);
  const dispatch = useDispatch();

  const createAdminCategory = (data) => {
    return dispatch(createCategoryAdminAction(data));
  };

  return {
    createAdminCategory,
    resCreateCategory: adminCategoryState.resCreateCategory,
  };
};

export default useCreateAdminCategory;
