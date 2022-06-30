import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../redux/actions/productAction.js";

const useCreateProduct = () => {
  const dispatch = useDispatch();
  const {resCreateProduct, loadingCreateProduct} = useSelector(
    (state) => state.productState
  );

  const createNewProduct = (payload) => {
    dispatch(createProductAction(payload));
  };
  return {
    createNewProduct,
    resCreateProduct,
    loadingCreateProduct
  };
};

export default useCreateProduct;
