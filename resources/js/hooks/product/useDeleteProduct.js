import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  deleteProductAction,
  resetProductResCRUD,
} from "../../redux/actions/productAction.js";
import useProducts from "./useProducts";
import { ERROR, NO_ERROR } from "../../constants/error.js";

const useDeleteProduct = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loadingDeleteProduct, setLoadingDeleteProduct] = React.useState(false);
  const { resDeleteProduct } = useSelector((state) => state.productState);
  const { getAllProducts, pagination } = useProducts();

  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
    setLoadingDeleteProduct(true);
  };

  React.useEffect(() => {
    if (resDeleteProduct?.error_code === NO_ERROR) {
      getAllProducts({ page: pagination.current_page });
      NotificationSuccess(t("notification"), resDeleteProduct.message);
      setLoadingDeleteProduct(false);
      dispatch(resetProductResCRUD());
    }
    if (resDeleteProduct && resDeleteProduct.error_code == ERROR) {
      setLoadingDeleteProduct(false);
      NotificationError(t("notification"), resDeleteProduct.error_message);
    }
  }, [resDeleteProduct]);

  return {
    deleteProduct,
    resDeleteProduct,
    loadingDeleteProduct,
    setLoadingDeleteProduct,
  };
};

export default useDeleteProduct;
