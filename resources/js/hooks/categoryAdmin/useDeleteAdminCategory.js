import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminCategoryAction } from "../../redux/actions/categoryAdminAction.js";
import { useTranslation } from "react-i18next";
import { NO_ERROR, ERROR } from "../../constants/error";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import useAdminCategories from "./useAdminCategories.js";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useDeleteAdminCategory = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const adminCategoryState = useSelector((state) => state.adminCategoryState);
  const { resDeleteCategory } = useSelector(
    (state) => state.adminCategoryState
  );
  const { getAdminCategories, pagination } = useAdminCategories();
  const dispatch = useDispatch();

  const deleteAdminCategory = (id) => {
    dispatch(deleteAdminCategoryAction(id));
  };

  React.useEffect(() => {
    if (resDeleteCategory?.error_code === NO_ERROR) {
      getAdminCategories({ page: pagination.current_page });
      NotificationSuccess(t("notification"), resDeleteCategory?.message);
      navigate(`${lang}/admin/category-list`);
    }
    if (resDeleteCategory?.error_code === ERROR) {
      NotificationError(t("notification"), resDeleteCategory?.error_message);
    }
  }, [resDeleteCategory]);

  return {
    deleteAdminCategory,
    resDeleteCategory: adminCategoryState.resDeleteCategory,
    resCreateCategory: adminCategoryState.resCreateCategory,
  };
};

export default useDeleteAdminCategory;
