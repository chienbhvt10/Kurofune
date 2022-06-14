import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../redux/actions/productAction";

const useProducts = () => {
  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const getAllProducts = (data) => {
    dispatch(getAllProductsAction(data));
  };

  return {
    getAllProducts,
    products: productState.products,
    pagination: {
      total: productState.total,
      from: productState.from,
      to: productState.to,
      current_page: productState.current_page,
      last_page: productState.last_page,
    },
  };
};

export default useProducts;
