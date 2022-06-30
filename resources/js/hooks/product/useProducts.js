import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../redux/actions/productAction";

const useProducts = () => {
  const productState = useSelector((state) => state.productState);
  const [loadingListProduct, setloadingListProduct] = React.useState(false);
  const dispatch = useDispatch();

  const getAllProducts = (data) => {
    dispatch(getAllProductsAction(data));
    setloadingListProduct(true)
  };
  React.useEffect(() => {
    if (productState.products) {
      setloadingListProduct(false);
    }
  }, [productState.products]);
  return {
    getAllProducts,
    loadingListProduct,
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
