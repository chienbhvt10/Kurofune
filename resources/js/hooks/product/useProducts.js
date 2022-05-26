import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../redux/actions/productAction";

const useProducts = () => {
  const products = useSelector((state) => state.productState.products);
  const dispatch = useDispatch();
  const getAllProducts = () => {
    dispatch(getAllProductsAction());
  };
  return {
    getAllProducts,
    products,
  };
};

export default useProducts;
