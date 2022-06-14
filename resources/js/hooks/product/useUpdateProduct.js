import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error.js";
import { getCurrentLanguage } from "../../helper/localStorage";
import {
  resetProductResCRUD,
  updateProductAction,
} from "../../redux/actions/productAction.js";
import useProducts from "./useProducts";

const useUpdateProduct = () => {
  const { resUpdateProduct } = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getAllProducts, pagination } = useProducts();
  const [loadingUpdateProduct, setLoadingUpdateProduct] = React.useState();

  const updateProduct = (payload) => {
    dispatch(updateProductAction(payload));
    setLoadingUpdateProduct(true);
  };

  React.useEffect(() => {
    if (resUpdateProduct?.error_code === NO_ERROR) {
      getAllProducts({ page: pagination.current_page });
      setLoadingUpdateProduct(false);
      NotificationSuccess(t("notification"), resUpdateProduct.message);
      navigate(`${lang}/admin/product-list`);
      dispatch(resetProductResCRUD());
    }
    if (resUpdateProduct && resUpdateProduct.error_code === ERROR) {
      setLoadingUpdateProduct(false);
      NotificationError(t("notification"), resUpdateProduct.error_message);
    }
  }, [resUpdateProduct]);

  return {
    resUpdateProduct,
    updateProduct,
    loadingUpdateProduct,
    setLoadingUpdateProduct,
  };
};

export default useUpdateProduct;
