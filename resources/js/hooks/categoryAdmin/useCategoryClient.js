import { useDispatch, useSelector } from "react-redux";
import { getCategoryClientAction } from "../../redux/actions/categoryAction";

const useCategoryClient = () => {
  const categoryState = useSelector((state) => state.categoryState);
  const dispatch = useDispatch();

  const getCategoryClient = (payload) => {
    dispatch(getCategoryClientAction(payload));
  };

  return {
    category: categoryState.category,
    getCategoryClient,
  };
};

export default useCategoryClient;
