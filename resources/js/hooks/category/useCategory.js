import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../redux/actions/categoryAction";

const useCategory = () => {
  const categoryState = useSelector((state) => state.categoryState);
  const dispatch = useDispatch();

  const getCategory = (payload) => {
    dispatch(getCategoryAction(payload));
  };

  return {
    category: categoryState.category,
    getCategory,
  };
};

export default useCategory;
