import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/actions/productAction.js";

const useProductDetail = () => {
  const product = useSelector((state) => state.productState.product);
  const dispatch = useDispatch();
  const getProduct = (id) => {
    dispatch(getProductAction(id));
  };
  return {
    getProduct,
    product,
  };
};

export default useProductDetail;
