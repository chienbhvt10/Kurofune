import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";
import {
  getCartInfo as getCartInfoAction,
  updateCart as updateCartAction,
  deleteCart as deleteCartAction,
  addToCart as addToCartAction,
  deleteCartItem as deleteCartItemAction,
  checkout as checkoutAction,
  resetCartCRUD,
} from "../../redux/actions/cartAction";
const useCart = () => {
  const lang = getCurrentLanguage();
  const { cartInfo, resAddToCart } = useSelector((state) => state.cartState);
  const isLoading = useSelector((state) => state.cartState.isLoading);
  const navigate = useNavigate();
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

  React.useEffect(() => {
    if (resAddToCart?.error_code === "NO_ERROR") {
      dispatch(resetCartCRUD());
      navigate(`${lang}/cart`);
    }
  }, [resAddToCart]);

  return {
    cartInfo,
    isLoading,
    getCartInfo,
    updateCart,
    deleteCart,
    addToCart,
    deleteCartItem,
    checkout,
    resAddToCart,
  };
};

export default useCart;
