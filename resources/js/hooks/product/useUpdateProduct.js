import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../redux/actions/productAction.js";

const useUpdateProduct = () => {
  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const updateProduct = (payload) => {
    dispatch(updateProductAction(payload));
  };
  return {
    resUpdateProduct: productState.resUpdateProduct,
    updateProduct,
  };
};

export default useUpdateProduct;
