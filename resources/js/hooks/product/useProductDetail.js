import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../redux/actions/productAction.js";

const useProductDetail = () => {
  const product = useSelector((state) => state.productState.product);
  const [loadingProduct, setloadingProduct] = React.useState(false);
  const dispatch = useDispatch();
  const getProduct = (id) => {
    setloadingProduct(true)
    dispatch(getProductAction(id));
  };

  
  React.useEffect(() => {
    if (product) {
      setloadingProduct(false);
    }
  }, [product]);
  return {
    getProduct,
    product,
    loadingProduct,
    setloadingProduct
  };
};

export default useProductDetail;
