import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "../../redux/actions/productAction.js";

const useDeleteProduct = () => {
  const dispatch = useDispatch();
  const resDeleteProduct = useSelector(
    (state) => state.productState.resDeleteProduct
  );
  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };
  return {
    deleteProduct,
    resDeleteProduct,
  };
};

export default useDeleteProduct;
