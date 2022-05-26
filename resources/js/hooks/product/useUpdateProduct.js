import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../redux/actions/productAction.js";

const useUpdateProduct = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const updateProduct = (payload) => {
    dispatch(updateProductAction(payload));
  };
  return {
    users: userState.users,
    resUpdateUser: userState.resUpdateUser,
    updateProduct,
  };
};

export default useUpdateProduct;
