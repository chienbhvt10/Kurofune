import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../redux/actions/productAction.js";

const useCreateProduct = () => {
  const dispatch = useDispatch();
  const resCreateProduct = useSelector(
    (state) => state.productState.resCreateProduct
  );

  const createNewProduct = (payload) => {
    dispatch(createProductAction(payload));
  };
  return {
    createNewProduct,
    resCreateProduct,
  };
};

export default useCreateProduct;
