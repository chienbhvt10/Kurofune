import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../redux/actions/productAction";

const useCartProduct = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const addToCart = (payload) => {
    dispatch(addToCartAction(payload));
  };
  return {
    cart: userState.users,
    resAddToCart: userState.resAddToCart,
    addToCart,
  };
};

export default useCartProduct;
