import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { updateAdminCategoryAction } from "../../redux/actions/categoryAdminAction.js";
import { useTranslation } from "react-i18next";
import { NO_ERROR, ERROR } from "../../constants/error";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import useAdminCategories from "./useAdminCategories.js";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useUpdateAdminCategory = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();

  const { resUpdateCategory } = useSelector(
    (state) => state.adminCategoryState
  );
  const { getAdminCategories, pagination, adminCategories } = useAdminCategories();
  const [loadingUpdateCategory, setLoadingUpdateCategory] = React.useState(false);
  const dispatch = useDispatch();

  const updateAdminCategory = (data) => {
    setLoadingUpdateCategory(true)
    return dispatch(updateAdminCategoryAction(data));
  };

  React.useEffect(() => {
    if (resUpdateCategory?.error_code === NO_ERROR) {
      getAdminCategories({ page: pagination.current_page });
      navigate(`${lang}/admin/category-list`);
      NotificationSuccess(t("notification"), resUpdateCategory?.message);
    }
  }, [resUpdateCategory]);
  React.useEffect(() => {
    if (adminCategories) {
      setLoadingUpdateCategory(false);
    }
  }, [adminCategories]);

  return {
    updateAdminCategory,
    resUpdateCategory,
    adminCategories,
    loadingUpdateCategory,
    setLoadingUpdateCategory
  };
};

export default useUpdateAdminCategory;
