import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLanguage } from "../../helper/localStorage.js";
import {
  getAllProductsAction,
  resetProductResCRUD,
} from "../../redux/actions/productAction";

const useProducts = () => {
  const { total, from, to, current_page, last_page, products } = useSelector(
    (state) => state.productState
  );
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();
  const [loadingListProduct, setLoadingListProduct] = React.useState(false);

  const getAllProducts = (data) => {
    dispatch(getAllProductsAction(data));
    setLoadingListProduct(true);
  };

  React.useEffect(() => {
    if (products?.length === 0) {
      getAllProducts();
    }
    dispatch(resetProductResCRUD());
  }, [products, lang]);

  React.useEffect(() => {
    if (products) {
      setLoadingListProduct(false);
    }
  }, [products]);

  return {
    getAllProducts,
    loadingListProduct,
    setLoadingListProduct,
    products,
    pagination: {
      total,
      from,
      to,
      current_page,
      last_page,
    },
  };
};

export default useProducts;
