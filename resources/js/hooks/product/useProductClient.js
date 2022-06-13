import { useDispatch, useSelector } from "react-redux";
import { getProductClientAction } from "../../redux/actions/productAction";

const useProductClient = () => {
  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const getProductClient = (payload) => {
    dispatch(getProductClientAction(payload));
  };

  return {
    productClient: productState.productClient,
    getProductClient,
  };
};

export default useProductClient;
