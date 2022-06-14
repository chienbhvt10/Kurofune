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
  createProductAction,
  resetProductResCRUD,
} from "../../redux/actions/productAction.js";
import useProducts from "./useProducts.js";

const useCreateProduct = () => {
  const dispatch = useDispatch();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getAllProducts, pagination } = useProducts();
  const { resCreateProduct, product } = useSelector(
    (state) => state.productState
  );
  const [loadingCreateProduct, setLoadingCreateProduct] = React.useState(false);

  const createNewProduct = (payload) => {
    dispatch(createProductAction(payload));
    setLoadingCreateProduct(true);
  };

  React.useEffect(() => {
    if (resCreateProduct?.error_code === NO_ERROR) {
      getAllProducts({ page: pagination.current_page });
      setLoadingCreateProduct(false);
      NotificationSuccess(t("notification"), resCreateProduct.message);
      navigate(`${lang}/admin/product-list`);
      dispatch(resetProductResCRUD());
    }
    if (resCreateProduct && resCreateProduct.error_code === ERROR) {
      setLoadingCreateProduct(false);
      NotificationError(t("notification"), resCreateProduct.error_message);
    }
  }, [resCreateProduct]);

  return {
    product,
    createNewProduct,
    resCreateProduct,
    loadingCreateProduct,
    setLoadingCreateProduct,
  };
};

export default useCreateProduct;
