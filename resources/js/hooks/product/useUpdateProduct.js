import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../redux/actions/productAction.js";

const useUpdateProduct = () => {
  const {resUpdateProduct , loadingUpdateProduct} = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const updateProduct = (payload) => {
    dispatch(updateProductAction(payload));
  };
  return {
    resUpdateProduct,
    updateProduct,
    loadingUpdateProduct,
  };
};

export default useUpdateProduct;
