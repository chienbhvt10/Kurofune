import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/actions/productAction.js";

const useProductDetail = () => {
  const { product } = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const [loadingProduct, setLoadingProduct] = React.useState(false);

  const getProduct = (id) => {
    dispatch(getProductAction(id));
    setLoadingProduct(true);
  };

  React.useEffect(() => {
    if (product) {
      setLoadingProduct(false);
    }
  }, [product]);

  return {
    getProduct,
    product,
    loadingProduct,
    setLoadingProduct,
  };
};

export default useProductDetail;
