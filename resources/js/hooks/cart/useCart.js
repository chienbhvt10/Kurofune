import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "../../commons/Notification/index.jsx";
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
import { useTranslation } from "react-i18next";
const useCart = () => {
  const lang = getCurrentLanguage();
  const { cartInfo, resAddToCart, resCheckout } = useSelector((state) => state.cartState);
  const isLoading = useSelector((state) => state.cartState.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();
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
    dispatch(checkoutAction(payload)).then(value => {
      if(value?.payload?.error_code == "NO_ERROR"){
        dispatch(resetCartCRUD());
        navigate(`${lang}/member/order-history`)
      }
      if(value?.payload){
        if(Object.keys(value?.payload?.error_data).some((key) => key.includes("billing")) && Object.keys(value?.payload?.error_data).some((key) => key.includes("shipping"))){
          dispatch(resetCartCRUD());
          NotificationError(t("client.checkout.message_error_blling_shipping"));
        }else if(Object.keys(value?.payload?.error_data).some((key) => key.includes("billing"))){
          dispatch(resetCartCRUD());
          NotificationError(t("client.checkout.message_error_blling"));
        }else if(Object.keys(value?.payload?.error_data).some((key) => key.includes("shipping"))){ 
          dispatch(resetCartCRUD());
          NotificationError(t("client.checkout.message_error_shipping"));
        }
      }
    });

  
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
    resCheckout,
    resAddToCart,
  };
};

export default useCart;
