import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartInfo as getCartInfoAction,
  updateCart as updateCartAction,
  deleteCart as deleteCartAction,
  addToCart as addToCartAction,
} from "../../redux/actions/cartAction";
const useCart = () => {
  const cartInfo = useSelector((state) => state.cartState.cartInfo);
  const dispatch = useDispatch();
  const getCartInfo = () => {
    dispatch(getCartInfoAction());
  };
  const addToCart = (payload) => {
    dispatch(addToCartAction(payload));
  };
  const updateCart = (payload) => {
    dispatch(updateCartAction(payload));
  };
  const deleteCart = () => dispatch(deleteCartAction());
  React.useEffect(() => {
    getCartInfo();
  }, []);

  return {
    cartInfo,
    getCartInfo,
    updateCart,
    deleteCart,
    addToCart,
  };
};

export default useCart;
