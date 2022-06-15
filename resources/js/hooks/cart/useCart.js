import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartInfo as getCartInfoAction,
  updateCart as updateCartAction,
  deleteCart as deleteCartAction,
  addToCart as addToCartAction,
  deleteCartItem as deleteCartItemAction,
  checkout as checkoutAction,
} from "../../redux/actions/cartAction";
const useCart = () => {
  const cartInfo = useSelector((state) => state.cartState.cartInfo);
  const isLoading = useSelector((state) => state.cartState.isLoading);

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
  const deleteCart = () => {
    dispatch(deleteCartAction());
  };
  const deleteCartItem = (id) => {
    dispatch(deleteCartItemAction(id));
  };
  const checkout = (payload) => {
    dispatch(checkoutAction(payload));
  };
  React.useEffect(() => {
    if (!cartInfo?.cart_item || cartInfo?.cart_item.length === 0) getCartInfo();
  }, []);

  return {
    cartInfo,
    isLoading,
    getCartInfo,
    updateCart,
    deleteCart,
    addToCart,
    deleteCartItem,
    checkout,
  };
};

export default useCart;
