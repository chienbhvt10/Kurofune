import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { createCategoryAdminAction } from "../../redux/actions/categoryAdminAction.js";
import { NO_ERROR, ERROR } from "../../constants/error";
import useAdminCategories from "./useAdminCategories.js";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useCreateAdminCategory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();

  const { resCreateCategory} = useSelector(
    (state) => state.adminCategoryState
  );
  
  const { getAdminCategories, adminCategories, pagination } =
    useAdminCategories();
  const [loadingCreateCategory, setloadingCreateCategory] = React.useState(false);
  const dispatch = useDispatch();

  const createAdminCategory = (data) => {
    setloadingCreateCategory(true)
    return dispatch(createCategoryAdminAction(data));
  };

  React.useEffect(() => {
    if (resCreateCategory?.error_code === NO_ERROR) {
      getAdminCategories({ page: pagination?.current_page });
      NotificationSuccess(t("notification"), resCreateCategory?.message);
      navigate(`${lang}/admin/category-list`);
    }
    if (resCreateCategory?.error_code === ERROR) {
      NotificationError(t("notification"), resCreateCategory?.error_message);
    }
  }, [resCreateCategory]);

  React.useEffect(() => {
    if (adminCategories) {
      setloadingCreateCategory(false);
    }
  }, [adminCategories]);

  return {
    createAdminCategory,
    resCreateCategory: resCreateCategory,
    loadingCreateCategory,
    adminCategories
  };
};

export default useCreateAdminCategory;
